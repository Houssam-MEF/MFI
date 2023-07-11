<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('head_counts', function (Blueprint $table) {
            $table->increments('id')->primarykey();
            $table->string('identifiant');
            $table->string('matricule');
            $table->string('highlight');
            $table->string('statut');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->string('cost_center');
            $table->string('zone');
            $table->string('workstation_type');
            $table->string('line');
            $table->string('group');
            $table->string('contract_type');
            $table->string('start_date');
            $table->string('first_period');
            $table->string('second_period');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('head_counts');
    }
};
