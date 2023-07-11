<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;
use App\Models\HeadCount;

class HeadCountImport implements ToModel, WithHeadingRow, WithCalculatedFormulas
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        if (is_numeric($row['starting_date'])) {
            $startDate =  Date::excelToDateTimeObject($row['starting_date'])->format('d-m-Y');
        } else {
            $startDate = $row["starting_date"];
        }

        if (is_numeric($row['1st_period'])) {
            $firstPeriod =  Date::excelToDateTimeObject($row['1st_period'])->format('d-m-Y');
        } else {
            $firstPeriod = $row["1st_period"];
        }

        if (is_numeric($row['2nd_period'])) {
            $secondPeriod =  Date::excelToDateTimeObject($row['2nd_period'])->format('d-m-Y');
        } else {
            $secondPeriod = $row["2nd_period"];
        }

            // dd($startDate, $firstPeriod, $secondPeriod);

            return new HeadCount([
                'identifiant' => $row['id'],
                'matricule' => $row['matricule'],
                'highlight' => $row['highlight'],
                'statut' => $row['statut'],
                'last_name' => $row['last_name'],
                'first_name' => $row['first_name'],
                'gender' => $row['gender'],
                'cost_center' => $row['cost_center'],
                'zone' => $row['zone'],
                'workstation_type' => $row['workstation_type'],
                'line' => $row['line'],
                'group' => $row['group'],
                'contract_type' => $row['contract_type'],
                'start_date' => $startDate,
                'first_period' => $firstPeriod,
                'second_period' => $secondPeriod,
            ]);

            // dd($collection);
        }
        // return new HeadCount([
        //     dd($collection)
        // ]);

}
