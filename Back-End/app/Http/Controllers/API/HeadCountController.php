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
        $agent->id_ = $request->input('id_');
        $agent->matricule = $request->input('matricule');
        $agent->highlight = $request->input('highlight');
        $agent->statut = $request->input('statut');
        $agent->first_name = $request->input('first_name');
        $agent->last_name = $request->input('last_name');
        $agent->gender = $request->input('gender');
        $agent->cost_center = $request->input('cost_center');
        $agent->zone = $request->input('zone');
        $agent->workstation_type = $request->input('workstation_type');
        $agent->line = $request->input('line');
        $agent->group = $request->input('group');
        $agent->contract_type = $request->input('contract_type');
        $agent->start_date = $request->input('start_date');
        $agent->first_period = $request->input('first_period');
        $agent->second_period = $request->input('second_period');
        $agent->save();

        return response()->json(['message' => 'Success !', 'Agent' => $agent]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id_)
    {
        $agent = Headcount::where('id_', $id_)->first();

        if ($agent){

        // $agent->id_ = $request->input('id_');
        $agent->matricule = $request->input('matricule');
        $agent->highlight = $request->input('highlight');
        $agent->statut = $request->input('statut');
        $agent->first_name = $request->input('first_name');
        $agent->last_name = $request->input('last_name');
        $agent->gender = $request->input('gender');
        $agent->cost_center = $request->input('cost_center');
        $agent->zone = $request->input('zone');
        $agent->workstation_type = $request->input('workstation_type');
        $agent->line = $request->input('line');
        $agent->group = $request->input('group');
        $agent->contract_type = $request->input('contract_type');
        $agent->start_date = $request->input('start_date');
        $agent->first_period = $request->input('first_period');
        $agent->second_period = $request->input('second_period');
        $agent->save();

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
        //
    }
}
