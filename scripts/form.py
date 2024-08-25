import time
import requests
import sqlite3
import json

from utils import DB_FILE, find_local_name, find_types

FIELDS = ['name', 'form_name', 'form_order', 'is_default', 'is_battle_only', 'is_mega', 'pokemon', 'types', 'version_group', 'sprites']

def get_form_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        return {
            # "order": data['order'],
            "name": data['name'],
            'name_local': find_local_name(data['names']),
            'name_en': find_local_name(data['names'], 'en'),
            'form_name': data['form_name'],
            'form_name_local': find_local_name(data['form_names']),
            'form_name_en': find_local_name(data['form_names'], 'en'),
            'form_order': data['form_order'],
            'is_default': data['is_default'],
            'is_battle_only': data['is_battle_only'],
            'is_mega': data['is_mega'],
            'pokemon': data['pokemon']['name'],
            'types': find_types(data['types']),
            'version_group': data['version_group']['name'],
            'sprites': find_sprites(data['sprites']),
        }
    else:
        return None
    

def get_all_forms(conn, cursor, is_append = False):
    response = requests.get('https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=10000')
    if response.status_code == 200:
        data = response.json()
        print('total:', data['count'])
        forms = data['results']
        for form in forms:
            cursor.execute('SELECT * FROM pokemon_form WHERE name = ?', (form['name'],))
            existing_form = cursor.fetchone()
            if existing_form is None:
                time.sleep(2)
                form_data = get_form_data(form['url'])
                # print(species_data)
                if form_data:
                    insert_pokemon(cursor, form_data, existing_form)
                    conn.commit()


def insert_pokemon(cursor, data, existing_data = None):
    print('Inserting pokemon_form:', data['name'])
    try:
        if existing_data:
            update_fields = []
            update_values = []
            # 获取列名
            cursor.execute('PRAGMA table_info(pokemon_form)')
            columns = [column[1] for column in cursor.fetchall()]
            
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_data[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])

            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE pokemon_form SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
                
        else:  
            cursor.execute('''
                INSERT INTO pokemon_form (name, name_local, name_en, form_name, form_name_local, form_name_en, form_order, is_default, is_battle_only, is_mega, pokemon, types, version_group, sprites)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
              data['name'],
              data['name_local'],
              data['name_en'],
              data['form_name'],
              data['form_name_local'],
              data['form_name_en'],
              data['form_order'],
              data['is_default'],
              data['is_battle_only'],
              data['is_mega'],
              data['pokemon'],
              data['types'],
              data['version_group'],
              data['sprites']
            ))
    except Exception as e:
        print('Error inserting pokemon_form:', e)


def find_sprites(sprites):
    name = sprites['front_default'].split('/')[8]
    sprites['front_home'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{name}"
    sprites['front_home_female'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/female/{name}" if sprites['front_female'] else None
    sprites['front_home_shiny'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/{name}" 
    sprites['front_home_shiny_female'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/female/{name}" if sprites['front_female'] else None
    return json.dumps(sprites, ensure_ascii=False)

def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pokemon_form (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            name_local TEXT,
            name_en TEXT,
            form_name TEXT,
            form_name_local TEXT,
            form_name_en TEXT,
            form_order INTEGER,
            is_default INTEGER,
            is_battle_only INTEGER,
            is_mega INTEGER,
            pokemon TEXT,
            types TEXT,
            version_group TEXT,
            sprites TEXT
        )
    ''')
    get_all_forms(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching pokemon forms...')
    run()
