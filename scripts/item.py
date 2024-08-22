
import json
import sqlite3
import requests
from utils import DB_FILE, LOCAL_LANG, extract_last_number, find_effect_entries, find_local_name, find_pokemons

FIELDS = ['name', 'name_local', 'name_en', 'cost', 'fling_power', 'fling_effect', 'category', 'attributes', 'sprites', 'flavor_texts_local', 'flavor_texts_en', 'effect_entries_local', 'effect_entries_en', 'game_index', 'held_by_pokemon', 'baby_trigger_for']

def get_item_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        try:
            data = response.json()
            return {
                'name': data['name'],
                'name_local': find_local_name(data['names']),
                'name_en': find_local_name(data['names'], 'en'),
                'cost': data['cost'],
                'fling_power': data['fling_power'],
                'fling_effect': data['fling_effect'] ['name'] if data['fling_effect'] else None,
                'category': data['category']['name'],
                'attributes': find_attributes(data['attributes']),
                'sprites': json.dumps(data['sprites'], ensure_ascii=False),
                'flavor_texts_local': find_flavor_text(data['flavor_text_entries']),
                'flavor_texts_en': find_flavor_text(data['flavor_text_entries'], 'en'),
                'effect_entries_local': find_effect_entries(data['effect_entries']),
                'effect_entries_en': find_effect_entries(data['effect_entries'], 'en'),
                'game_index': find_game_indices(data['game_indices']),
                'held_by_pokemon': find_pokemons(data['held_by_pokemon']),
                'baby_trigger_for': extract_last_number(data['baby_trigger_for']['url']) if data['baby_trigger_for'] else None,
            }
        except Exception as e:
            print('Error parsing item:', e)
            return None
    else:
        return None

def get_all_items(conn, cursor):
    response = requests.get('https://pokeapi.co/api/v2/item?offset=0&limit=10000')
    if response.status_code == 200:
        data = response.json()
        items = data['results']
        print('total:', data['count'])
        for item in items:
            cursor.execute('SELECT * FROM item WHERE name = ?', (item['name'],))
            existing_item = cursor.fetchone()
            if existing_item is None:
                item_data = get_item_data(item['url'])
                if item_data:
                    insert_item(cursor, item_data, existing_item)
                    conn.commit()

def insert_item(cursor, data, existing_item = None):
    print('Inserting item:', data['name_local'])

    try:
        if existing_item:
            update_fields = []
            update_values = []
            cursor.execute('PRAGMA table_info(item)')
            columns = [column[1] for column in cursor.fetchall()]
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_item[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])
            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE item SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
        else:
            cursor.execute('''
                INSERT INTO item (name, name_local, name_en, cost, fling_power, fling_effect, category, attributes, sprites, flavor_texts_local, flavor_texts_en, effect_entries_local, effect_entries_en, game_index, held_by_pokemon, baby_trigger_for)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['name'],
                data['name_local'],
                data['name_en'],
                data['cost'],
                data['fling_power'],
                data['fling_effect'],
                data['category'],
                data['attributes'],
                data['sprites'],
                data['flavor_texts_local'],
                data['flavor_texts_en'],
                data['effect_entries_local'],
                data['effect_entries_en'],
                data['game_index'],
                data['held_by_pokemon'],
                data['baby_trigger_for']
            ))
    except Exception as e:
      print('Error inserting item:', e)

def find_game_indices(game_indices):
    result = []
    for game_index in game_indices:
        result.append({
            "game_index": game_index['game_index'],
            "generation": game_index['generation']['name']
        })
    return json.dumps(result, ensure_ascii=False)

def find_attributes(attributes):
    result = []
    for attribute in attributes:
        result.append(attribute['name'])
    return json.dumps(result, ensure_ascii=False)

def find_flavor_text(flavor_texts, lang = LOCAL_LANG):
    texts = []
    for text in flavor_texts:
        if text['language']['name'] == lang:
            text= {
                "text": text['text'],
                "version_group": text['version_group']['name']
            }
            texts.append(text)
    return json.dumps(texts, ensure_ascii=False)


def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            name_local TEXT,
            name_en TEXT,
            cost INTEGER,
            fling_power INTEGER,
            fling_effect TEXT,
            category TEXT,
            attributes TEXT,
            sprites TEXT,
            flavor_texts_local TEXT,
            flavor_texts_en TEXT,
            effect_entries_local TEXT,
            effect_entries_en TEXT,
            game_index TEXT,
            held_by_pokemon TEXT,
            baby_trigger_for INTEGER
        )
    ''')
    get_all_items(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching items...')
    run()

