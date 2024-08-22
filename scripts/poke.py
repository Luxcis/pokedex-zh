import time
import requests
import sqlite3
import json

from utils import DB_FILE, find_types

FIELDS = ['name', 'base_experience', 'height', 'weight', 'species', 'is_default', 'abilities', 'types', 'forms', 'stats', 'game_indices', 'held_items', 'cries', 'sprites', 'moves']

def get_pokemon_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        return {
            # "order": data['order'],
            "name": data['name'],
            'base_experience': data['base_experience'],
            'height': data['height'],
            'weight': data['weight'],
            'species': data['species']['name'],
            'is_default': data['is_default'],
            'abilities': find_ablities (data['abilities']),
            'types': find_types(data['types']),
            'forms': find_forms(data['forms']),
            'stats': find_stats(data['stats']),
            'game_indices': find_game_indices(data['game_indices']),
            'held_items': find_held_items(data['held_items']),
            'cries': json.dumps(data['cries'], ensure_ascii=False),
            'sprites': json.dumps(data['sprites'], ensure_ascii=False),
            'moves': find_moves(data['moves']),
        }
    else:
        return None
    

def get_all_pokemons(conn, cursor, is_append = False):
    response = requests.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000')
    if response.status_code == 200:
        data = response.json()
        print('total:', data['count'])
        pokemons = data['results']
        for pokemon in pokemons:
            cursor.execute('SELECT * FROM pokemon WHERE name = ?', (pokemon['name'],))
            existing_pokemon = cursor.fetchone()
            if existing_pokemon is None:
                time.sleep(2)
                pokemon_data = get_pokemon_data(pokemon['url'])
                # print(species_data)
                if pokemon_data:
                    insert_pokemon(cursor, pokemon_data, existing_pokemon)
                    conn.commit()


def insert_pokemon(cursor, data, existing_data = None):
    print('Inserting pokemon:', data['name'])
    try:
        if existing_data:
            update_fields = []
            update_values = []
            # 获取列名
            cursor.execute('PRAGMA table_info(pokemon)')
            columns = [column[1] for column in cursor.fetchall()]
            
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_data[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])

            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE pokemon SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
                
        else:  
            cursor.execute('''
                INSERT INTO pokemon (name, base_experience, height, weight, species, is_default, abilities, types, forms, stats, game_indices, held_items, cries, sprites, moves)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['name'],
                data['base_experience'],
                data['height'],
                data['weight'],
                data['species'],
                data['is_default'],
                data['abilities'],
                data['types'],
                data['forms'],
                data['stats'],
                data['game_indices'],
                data['held_items'],
                data['cries'],
                data['sprites'],
                data['moves']
            ))
    except Exception as e:
        print('Error inserting pokemon:', e)

def find_ablities(abilities):
    result = []
    for ability in abilities:
        result.append({
            "name": ability['ability']['name'],
            "is_hidden": ability['is_hidden'],
            "slot": ability['slot']
        })
    return json.dumps(result, ensure_ascii=False)

def find_stats(stats):
    result = []
    for stat in stats:
        result.append({
            "base_stat": stat['base_stat'],
            "effort": stat['effort'],
            "name": stat['stat']['name']
        })
    return json.dumps(result, ensure_ascii=False)

def find_game_indices(game_indices):
    result = []
    for game_index in game_indices:
        result.append({
            "game_index": game_index['game_index'],
            "version": game_index['version']['name']
        })
    return json.dumps(result, ensure_ascii=False)

def find_held_items(held_items):
    result = []
    for held_item in held_items:
        result.append(held_item['item']['name'])
    return json.dumps(result, ensure_ascii=False)

def find_forms(forms):
    result = []
    for form in forms:
        result.append(form['name'])
    return json.dumps(result, ensure_ascii=False)

def find_moves(moves):
    result = []
    for move in moves:
        name = move['move']['name']
        version_details = []
        for version_detail in move['version_group_details']:
            version_details.append({
                "level_learned_at": version_detail['level_learned_at'],
                "move_learn_method": version_detail['move_learn_method']['name'],
                "version_group": version_detail['version_group']['name']
            })
        result.append({
            "name": name,
            "version_details": version_details
        })
    return json.dumps(result, ensure_ascii=False)

def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pokemon (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            base_experience INTEGER,
            height INTEGER,
            weight INTEGER,
            species TEXT,
            is_default BOOLEAN,
            abilities TEXT,
            types TEXT,
            forms TEXT,
            stats TEXT,
            game_indices TEXT,
            held_items TEXT,
            cries TEXT,
            sprites TEXT,
            moves TEXT
        )
    ''')
    get_all_pokemons(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching pokemons...')
    run()
