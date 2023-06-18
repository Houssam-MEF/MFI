<?php

namespace App\Imports;

use Carbon\Carbon;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use PhpOffice\PhpSpreadsheet\Shared\Date;




class UserImport implements ToModel, WithHeadingRow, WithCalculatedFormulas
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {

        // $startDate = Carbon::createFromFormat('d-m-Y', $row['startinh_date'])->format('Y-m-d');
        // $startDate = Carbon::parse($row['startinh_date'])->format('d/m/Y');
        // $startDate = Carbon::createFromFormat('d/m/Y', $row['startinh_date'])->format('Y-m-d');

        // $startDate = Date::excelToDateTimeObject($row['startinh_date'])->format('d-m-Y');

        $startDate    = Date::excelToDateTimeObject(intval($row['startinh_date']))->format('d-m-Y');
        $firstPeriod  = Date::excelToDateTimeObject(intval($row['1_ere_period']))->format('d-m-Y');
        $secondPeriod = Date::excelToDateTimeObject(intval($row['2_eme_priod']))->format('d-m-Y');


        // $toto =  strtotime('+6 months', strtotime($startDate));
        // $firstPeriod = Date::excelToDateTimeObject(intval($row['startinh_date']))->add(new DateInterval('P6M'))->format('d-m-Y');
        // $secondPeriod = Date::excelToDateTimeObject($firstPeriod)->add(new DateInterval('P6M'))->format('d-m-Y');


        return new User([
            "id"=>$row['id'],
            'equa'=>$row['equa'],
            'highlight'=>$row['nothing_to_highlight'],
            'matricule'=>$row['matricule'],
            'statut'=>$row['statut'],
            'cost_center'=>$row['cost_center'],
            'last_name'=>$row['last_name'],
            'first_name'=>$row['first_name'],
            'zone'=>$row['zone'],
            'gender'=>$row['gender'],
            'contract_type'=>$row['contract_type'],
            'num_workstation'=>$row['workstation_numbr'],
            'type_workstation'=>$row['workstation_type'],
            'line'=>$row['line'],
            'group'=>$row['group'],
            'start_date'=>$startDate,
            'first_period'=>$firstPeriod,
            'second_period'=>$secondPeriod,


            // dd($startDate, $firstPeriod, $secondPeriod),
            // dd($row['2 eme priod']),
            // dd($secondPeriod),

        ]);

    }
}
