import time
import requests
import sqlite3
import json

from utils import DB_FILE, LOCAL_LANG, extract_last_number, find_flavor_text, find_local_name
FIELDS = ['name', 'accuracy', 'effect_chance', 'pp', 'priority', 'power', 'contest_combos', 'contest_effect', 'contest_type', 'damage_class', 'effect_entries_local', 'effect_entries_en', 'type', 'target', 'generation', 'meta', 'machines', 'flavor_texts_local', 'flavor_texts_en', 'learned_by_pokemon']

def get_move_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        return {
            "name": data['name'],
            'name_local': find_local_name(data['names']),
            'name_en': find_local_name(data['names'], 'en'),
            'accuracy': data['accuracy'],
            'effect_chance': data['effect_chance'],
            'pp': data['pp'],
            'priority': data['priority'],
            'power': data['power'],
            'contest_combos': find_contest_combos(data['contest_combos']),
            'contest_effect': extract_last_number(data['contest_effect']['url']) if data['contest_effect'] else None,
            'contest_type': data['contest_type']['name'] if data['contest_type'] else None,
            'damage_class': data['damage_class']['name'],
            'effect_entries_local': find_effect_entries(data['effect_entries']),
            'effect_entries_en': find_effect_entries(data['effect_entries'], 'en'),
            'type': data['type']['name'],
            'target': data['target']['name'],
            'generation': data['generation']['name'],
            'meta': find_meta(data['meta']),
            'machines': find_machines(data['machines']),
            'flavor_texts_local': find_flavor_text(data['flavor_text_entries']),
            'flavor_texts_en': find_flavor_text(data['flavor_text_entries'], 'en'),
            'learned_by_pokemon': find_learned_by_pokemon(data['learned_by_pokemon']),
        }
    else:
        return None
    

def get_all_moves(conn, cursor, is_append = False):
    response = requests.get('https://pokeapi.co/api/v2/move?offset=0&limit=2000')
    if response.status_code == 200:
        data = response.json()
        print('total:', data['count'])
        moves = data['results']
        for move in moves:
            cursor.execute('SELECT * FROM move WHERE name = ?', (move['name'],))
            existing_move = cursor.fetchone()
            if existing_move is None:
                time.sleep(1)
                move_data = get_move_data(move['url'])
                # print(species_data)
                if move_data:
                    insert_move(cursor, move_data, existing_move)
                    conn.commit()

def insert_move(cursor, data, existing_data = None):
    print('Inserting move:', data['name'])
    try:
        if existing_data:
            update_fields = []
            update_values = []
            # 获取列名
            cursor.execute('PRAGMA table_info(move)')
            columns = [column[1] for column in cursor.fetchall()]
            
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_data[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])

            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE move SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
                
        else:  
            cursor.execute('''
                INSERT INTO move (name, name_local, name_en, accuracy, effect_chance, pp, priority, power, contest_combos, contest_effect, contest_type, damage_class, effect_entries_local, effect_entries_en, type, target, generation, meta, machines, flavor_texts_local, flavor_texts_en, learned_by_pokemon)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
              data['name'],
              data['name_local'],
              data['name_en'],
              data['accuracy'],
              data['effect_chance'],
              data['pp'],
              data['priority'],
              data['power'],
              data['contest_combos'],
              data['contest_effect'],
              data['contest_type'],
              data['damage_class'],
              data['effect_entries_local'],
              data['effect_entries_en'],
              data['type'],
              data['target'],
              data['generation'],
              data['meta'],
              data['machines'],
              data['flavor_texts_local'],
              data['flavor_texts_en'],
              data['learned_by_pokemon']
            ))
    except Exception as e:
        print('Error inserting move:', e)

def find_effect_entries(effect_entries, lang = LOCAL_LANG):
    texts = []
    for text in effect_entries:
        if text['language']['name'] == lang:
            text= {
                "effect": text['effect'],
                "short_effect": text['short_effect']
            }
            texts.append(text)
    return json.dumps(texts, ensure_ascii=False)

def find_meta(meta):
    if meta: 
        result = {
            "ailment": meta['ailment']['name'] if meta['ailment'] else None,
            'ailment_chance': meta['ailment_chance'],
            "category": meta['category']['name'],
            'crit_rate': meta['crit_rate'],
            'drain': meta['drain'],
            'flinch_chance': meta['flinch_chance'],
            'healing': meta['healing'],
            'max_hits': meta['max_hits'],
            'max_turns': meta['max_turns'],
            'min_hits': meta['min_hits'],
            'min_turns': meta['min_turns'],
            'stat_chance': meta['stat_chance'],
        }
        return json.dumps(result, ensure_ascii=False)
    else:
        return None

def find_machines(machines):
    result = []
    for machine in machines:
        result.append({
            "machine": extract_last_number(machine['machine']['url']),
            "version_group": machine['version_group']['name']
        })
    return json.dumps(result, ensure_ascii=False)

def find_learned_by_pokemon(pokemons):
    return json.dumps([pokemon['name'] for pokemon in pokemons], ensure_ascii=False)

def find_contest_combos(contest_combos):
    if(contest_combos):
      result = {
          'normal': {
              'use-after': find_use(contest_combos['normal']['use_after']),
              'use-before': find_use(contest_combos['normal']['use_before'])
          },
          'super': {
              'use-after': find_use(contest_combos['super']['use_after']),
              'use-before': find_use(contest_combos['super']['use_before'])
          }
      }
      return json.dumps(result, ensure_ascii=False)

def find_use(uses):
    result = []
    if(uses):
      for use in uses:
          result.append(use['name'])
      return result

def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS move (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            name_local TEXT,
            name_en TEXT,
            accuracy INTEGER,
            effect_chance INTEGER,
            pp INTEGER,
            priority INTEGER,
            power INTEGER,
            contest_combos TEXT,
            contest_effect INTEGER,
            contest_type TEXT,
            damage_class TEXT,
            effect_entries_local TEXT,
            effect_entries_en TEXT,
            type TEXT,
            target TEXT,
            generation TEXT,
            meta TEXT,
            machines TEXT,
            flavor_texts_local TEXT,
            flavor_texts_en TEXT,
            learned_by_pokemon TEXT
        )
    ''')
    get_all_moves(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching moves...')
    run()
