<?php

// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    // 🔥 ユーザー取得
    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    // 🔥 更新
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required',
        ]);

        $user->name = $request->name;
        $user->save();

        return response()->json($user);
    }

    // 🔥 削除
    public function delete(Request $request)
    {
        $user = $request->user();

        $user->tokens()->delete(); // トークン削除
        $user->delete();

        return response()->json([
            'message' => '削除完了'
        ]);
    }
}