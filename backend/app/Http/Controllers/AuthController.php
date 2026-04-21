<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'バリデーションエラー',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // 🔥 トークン生成（安全に）
            $token = method_exists($user, 'createToken')
                ? $user->createToken('token')->plainTextToken
                : null;

            return response()->json([
                'message' => '登録成功',
                'user'    => $user,
                'token'   => $token,
            ], 201);

        } catch (\Throwable $e) { // ← ここ重要
            return response()->json([
                'message' => 'サーバーエラー',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'バリデーションエラー',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'メールアドレスまたはパスワードが正しくありません'
                ], 401);
            }

            // 🔥 Sanctumが無くても落ちないようにする
            $token = null;

            if (method_exists($user, 'tokens')) {
                $user->tokens()->delete();
            }

            if (method_exists($user, 'createToken')) {
                $token = $user->createToken('token')->plainTextToken;
            }

            return response()->json([
                'message' => 'ログイン成功',
                'user'    => $user,
                'token'   => $token,
            ], 200);

        } catch (\Throwable $e) { // ← ここ重要
            return response()->json([
                'message' => 'サーバーエラー',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}