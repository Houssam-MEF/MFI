<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadCount extends Model
{
    use HasFactory;

    protected $table = 'head_counts';

    // protected $guarded = [];

    protected $primaryKey = 'ID';

    protected $fillable = [
        'ID',
        'identifiant',
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
