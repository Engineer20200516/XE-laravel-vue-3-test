<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'administrator',
            'email' => 'admin@admin.com',
            'password' => '$2y$10$zOnkkDG6S8Jb0Q9KgKfy/eRqYY8eD5i7Kc/5UOdryP7UDq4PBdHai'
        ]);
    }
}
