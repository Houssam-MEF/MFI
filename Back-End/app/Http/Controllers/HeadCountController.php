<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\HeadCount;
use Maatwebsite\Excel\Facades\Excel; // Import the Excel class
use App\Imports\HeadCountImport;

class HeadCountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headCounts = HeadCount::all();
        return view('homepage', [
            'import' => $headCounts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function showDeleteForm($id)
{
    $agent = Headcount::findOrFail($id);

    return view('delete', ['agent' => $agent]);
}



    public function import ()
    {
        Excel::import(new HeadCountImport, request()->file('import_file'));
        return back();
    }

    public function export ()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }

    public function truncateTable()
    {
        DB::table('head_counts')->truncate();
        return redirect()->back()->with('success', 'Table truncated successfully.');
    }
}
