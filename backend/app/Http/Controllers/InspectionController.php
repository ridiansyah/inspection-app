<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class InspectionController extends BaseController
{
    public function index()
    {
        try {
            // Define the JSON file path (use storage_path helper if available, otherwise fallback to __DIR__)
            $path = function_exists('storage_path')
                ? storage_path('app/fe-datatest.json')
                : __DIR__ . '/../../../../storage/app/fe-datatest.json';

            // If the file does not exist, return a 404 error response
            if (!file_exists($path)) {
                return [
                    'error' => 'Data file not found',
                    'status' => 404,
                ];
            }

            // Read the file contents
            $data = file_get_contents($path);

            // Remove NumberInt(x) wrapper to make it valid JSON (e.g., NumberInt(123) -> 123)
            $sanitised = preg_replace('/NumberInt\((\d+)\)/', '$1', $data);

            // Decode JSON into a PHP associative array
            $json = json_decode($sanitised, true);

            // Return the decoded data
            return $json;
        } catch (\Throwable $e) {
            // Handle any exception if loading or decoding fails
            return [
                'error' => 'Failed to load data',
                'exception' => $e->getMessage(),
                'status' => 500,
            ];
        }
    }
}
