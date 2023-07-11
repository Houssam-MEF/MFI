<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HeadCount;

class HeadCountController extends Controller
{

    public function filter(Request $request)
    {
        $query = $request->input('p');
        $headcount = HeadCount::where('first_name', 'like', "%$query%")->get();
        return response()->json($headcount);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headCounts = HeadCount::all();
        return response()->json($headCounts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $agent = new HeadCount;
        $agent->identifiant = $request->identifiant;
        $agent->matricule = $request->matricule;
        $agent->highlight = $request->highlight;
        $agent->statut = $request->statut;
        $agent->first_name = $request->first_name;
        $agent->last_name = $request->last_name;
        $agent->gender = $request->gender;
        $agent->cost_center = $request->cost_center;
        $agent->zone = $request->zone;
        $agent->workstation_type = $request->workstation_type;
        $agent->line = $request->line;
        $agent->group = $request->group;
        $agent->contract_type = $request->contract_type;
        $agent->start_date = $request->start_date;
        $agent->first_period = $request->first_period;
        $agent->second_period = $request->second_period;
        $agent->save();

        return response()->json(['message' => 'Success !', 'Agent' => $agent]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $agent = HeadCount::find($id);
        return response()->json(['Agent' => $agent]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
       $request->validate([
            'identifiant'=>'required'
        ]);

        $agent = HeadCount::find($id);

        if ($agent){
            $agent->update([
                "identifiant" => $request->input('identifiant'),
                "matricule" =>  $request->input('matricule'),
                "highlight" => $request->input('highlight'),
                "statut" => $request->input('statut'),
                "first_name" => $request->input('first_name'),
                "last_name" => $request->input('last_name'),
                "gender" => $request->input('gender'),
                "cost_center" => $request->input('cost_center'),
                "zone" => $request->input('zone'),
                "workstation_type" => $request->input('workstation_type'),
                "line" => $request->input('line'),
                "group" => $request->input('group'),
                "contract_type" => $request->input('contract_type'),
                "start_date" => $request->input('start_date'),
                "first_period" => $request->input('first_period'),
                "second_period" => $request->input('second_period')
            ]);

            // $agent->save();

            // $agent->matricule = "5555";
            // $agent->save();


            // $agent->update(['matricule' => '111']);


        return response()->json(['message' => 'Updated Succefully !', 'Agent' => $agent], 200);
    } else {
            return response()->json(['message' => 'Not Found !', 'Agent' => $agent], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $agent = HeadCount::find($id);
        if ($agent)
        {
            $agent->delete();
            return response()->json(['message'=>'Deleted Successfully'], 200);
        } else {
            return response()->json(['message'=>'Not Found'], 404);
        }
    }
}


