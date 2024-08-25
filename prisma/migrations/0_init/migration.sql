-- CreateTable
CREATE TABLE "ability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_local" TEXT,
    "name_en" TEXT,
    "flavor_texts_local" TEXT,
    "flavor_texts_en" TEXT,
    "effect_entries_local" TEXT,
    "effect_entries_en" TEXT,
    "is_main_series" INTEGER,
    "generation" TEXT,
    "pokemon" TEXT
);

-- CreateTable
CREATE TABLE "evolution_chain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evolution_chain_id" INTEGER NOT NULL,
    "baby_trigger_item" TEXT,
    "chain" TEXT
);

-- CreateTable
CREATE TABLE "item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_local" TEXT,
    "name_en" TEXT,
    "cost" INTEGER,
    "fling_power" INTEGER,
    "fling_effect" TEXT,
    "category" TEXT,
    "attributes" TEXT,
    "sprites" TEXT,
    "flavor_texts_local" TEXT,
    "flavor_texts_en" TEXT,
    "effect_entries_local" TEXT,
    "effect_entries_en" TEXT,
    "game_index" TEXT,
    "held_by_pokemon" TEXT,
    "baby_trigger_for" INTEGER
);

-- CreateTable
CREATE TABLE "move" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_local" TEXT,
    "name_en" TEXT,
    "accuracy" INTEGER,
    "effect_chance" INTEGER,
    "pp" INTEGER,
    "priority" INTEGER,
    "power" INTEGER,
    "contest_combos" TEXT,
    "contest_effect" INTEGER,
    "contest_type" TEXT,
    "damage_class" TEXT,
    "effect_entries_local" TEXT,
    "effect_entries_en" TEXT,
    "type" TEXT,
    "target" TEXT,
    "generation" TEXT,
    "meta" TEXT,
    "machines" TEXT,
    "flavor_texts_local" TEXT,
    "flavor_texts_en" TEXT,
    "learned_by_pokemon" TEXT
);

-- CreateTable
CREATE TABLE "pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "base_experience" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "species" TEXT,
    "is_default" BOOLEAN,
    "abilities" TEXT,
    "types" TEXT,
    "forms" TEXT,
    "stats" TEXT,
    "game_indices" TEXT,
    "held_items" TEXT,
    "cries" TEXT,
    "sprites" TEXT,
    "moves" TEXT
);

-- CreateTable
CREATE TABLE "pokemon_form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_local" TEXT,
    "name_en" TEXT,
    "form_name" TEXT,
    "form_name_local" TEXT,
    "form_name_en" TEXT,
    "form_order" INTEGER,
    "is_default" INTEGER,
    "is_battle_only" INTEGER,
    "is_mega" INTEGER,
    "pokemon" TEXT,
    "types" TEXT,
    "version_group" TEXT,
    "sprites" TEXT
);

-- CreateTable
CREATE TABLE "species" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_local" TEXT,
    "name_en" TEXT,
    "name_jp" TEXT,
    "genus_local" TEXT,
    "genus_en" TEXT,
    "color" TEXT,
    "shape" TEXT,
    "forms_switchable" BOOLEAN,
    "generation" TEXT,
    "growth_rate" TEXT,
    "habitat" TEXT,
    "has_gender_differences" BOOLEAN,
    "hatch_counter" INTEGER,
    "is_baby" BOOLEAN,
    "is_legendary" BOOLEAN,
    "is_mythical" BOOLEAN,
    "base_happiness" INTEGER,
    "capture_rate" INTEGER,
    "gender_rate" INTEGER,
    "sprite_default" TEXT,
    "sprite_home" TEXT,
    "egg_groups" TEXT,
    "flavor_texts_local" TEXT,
    "flavor_texts_en" TEXT,
    "pal_park_encounters" TEXT,
    "pokedex_numbers" TEXT,
    "varieties" TEXT,
    "evolution_chain_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "ability_name_key" ON "ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "evolution_chain_evolution_chain_id_key" ON "evolution_chain"("evolution_chain_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "move_name_key" ON "move"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_name_key" ON "pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_form_name_key" ON "pokemon_form"("name");

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "species"("name");

