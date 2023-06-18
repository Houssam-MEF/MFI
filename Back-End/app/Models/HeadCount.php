<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadCount extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_',
        'matricule',
        'highlight',
        'statut',
        'last_name',
        'first_name',
        'gender',
        'cost_center',
        'zone',
        'workstation_type',
        'line',
        'group',
        'contract_type',
        'start_date',
        'first_period',
        'second_period',
    ];
}
