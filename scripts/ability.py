
import sqlite3
import requests
from utils import DB_FILE, LOCAL_LANG, find_effect_entries, find_flavor_text, find_local_name, find_pokemons

FIELDS = ['name', 'name_local', 'name_en', 'flavor_texts_local', 'flavor_texts_en', 'effect_entries_local', 'effect_entries_en', 'is_main_series', 'generation', 'pokemon']

def get_ability_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        return {
            'name': data['name'],
            'name_local': find_local_name(data['names']),
            'name_en': find_local_name(data['names'], 'en'),
            'flavor_texts_local': find_flavor_text(data['flavor_text_entries']),
            'flavor_texts_en': find_flavor_text(data['flavor_text_entries'], 'en'),
            'effect_entries_local': find_effect_entries(data['effect_entries']),
            'effect_entries_en': find_effect_entries(data['effect_entries'], 'en'),
            'is_main_series': data['is_main_series'],
            'generation': data['generation']['name'],
            'pokemon': find_pokemons(data['pokemon'])
        }
    else:
        return None

def get_all_abilities(conn, cursor):
    response = requests.get('https://pokeapi.co/api/v2/ability?offset=0&limit=10000')
    if response.status_code == 200:
        data = response.json()
        abilities = data['results']
        for ability in abilities:
            cursor.execute('SELECT * FROM ability WHERE name = ?', (ability['name'],))
            existing_ability = cursor.fetchone()
            if existing_ability is None:
                ability_data = get_ability_data(ability['url'])
                # print(ability_data)
                if ability_data:
                    insert_ability(cursor, ability_data, existing_ability)
                    conn.commit()

def insert_ability(cursor, data, existing_ability = None):
    print('Inserting ability:', data['name_local'])

    try:
        if existing_ability:
            update_fields = []
            update_values = []
            cursor.execute('PRAGMA table_info(ability)')
            columns = [column[1] for column in cursor.fetchall()]
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_ability[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])
            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE ability SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
        else:
            cursor.execute('''
                INSERT INTO ability (name, name_local, name_en, flavor_texts_local, flavor_texts_en, effect_entries_local, effect_entries_en, is_main_series, generation, pokemon)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['name'], data['name_local'], data['name_en'], data['flavor_texts_local'], data['flavor_texts_en'], data['effect_entries_local'], data['effect_entries_en'], data['is_main_series'], data['generation'], data['pokemon']
            ))
    except Exception as e:
      print('Error inserting ability:', e)

def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ability (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            name_local TEXT,
            name_en TEXT,
            flavor_texts_local TEXT,
            flavor_texts_en TEXT,
            effect_entries_local TEXT,
            effect_entries_en TEXT,
            is_main_series INTEGER,
            generation TEXT,
            pokemon TEXT
        )
    ''')
    get_all_abilities(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching abilities...')
    run()

