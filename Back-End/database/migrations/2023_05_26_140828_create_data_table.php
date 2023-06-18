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
        Schema::create('data', function (Blueprint $table) {
            $table->string('id');
            $table->string('equa');
            $table->string('highlight');
            $table->string('matricule');
            $table->string('statut');
            $table->string('cost_center');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('zone');
            $table->string('gender');
            $table->string('contract_type');
            $table->string('num_workstation');
            $table->string('type_workstation');
            $table->string('line');
            $table->string('group');
            $table->date('start_date');
            $table->date('first_period');
            $table->date('second_period');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data');
    }
};
