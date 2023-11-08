<?php

namespace App\Http\Controllers;

use App\Mail\NotificationEmail;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Mail;
use Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $companies = Company::all(); // Retrieve all companies
        $companies = Company::paginate(10);
        return response()->json($companies);
    }

    public function all()
    {
        $companies = Company::all();
        return response()->json($companies);
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
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => '',
            'logo' => 'image|max:2048',
            'website' => '',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle the storage of the newly created company

        $logoPath = '';
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }

        $company = Company::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'logo' => $logoPath,
            'website' => $request->input('website'),
        ]);

        $content = [
            'subject' => 'New company has arrived',
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ];

        $users = User::all();

        foreach ($users as $user) {
            Mail::to($user->email)->send(new NotificationEmail($content));
        }

        return response()->json(['message' => 'Company created successfully', 'company' => $company], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return response()->json($company);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => '',
            'logo' => '',
            'website' => '',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
            $company->logo = $logoPath;
        }

        $company->name = $request->input('name');
        $company->email = $request->input('email');
        $company->website = $request->input('website');
        $company->save();

        return response()->json(['message' => 'Company updated successfully', 'company' => $company], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
