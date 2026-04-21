<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // バリデーション用に追加

class UserController extends Controller
{
    /**
     * 🔥 ユーザー取得
     * auth:sanctum ミドルウェアを通っているため、
     * $request->user() で現在ログイン中のユーザーが取得できます。
     */
    public function getUser(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'ユーザーが見つかりません'
            ], 404);
        }

        return response()->json($user);
    }

    /**
     * 🔥 更新
     * 名前などの変更時にリダイレクトが発生しないよう
     * Validator::make を使用します。
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // 1. 手動バリデーション
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        // 2. バリデーション失敗時は 422 JSON を返す
        if ($validator->fails()) {
            return response()->json([
                'message' => '入力内容に不備があります',
                'errors'  => $validator->errors()
            ], 422);
        }

        // 3. 保存処理
        $user->name = $request->name;
        $user->save();

        return response()->json([
            'message' => 'ユーザー情報を更新しました',
            'user'    => $user
        ]);
    }

    /**
     * 🔥 削除
     * 退会処理など。トークンを無効化してからユーザーを削除します。
     */
    public function delete(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'ユーザーが存在しません'
            ], 404);
        }

        // 1. 現在のトークン（または全トークン）を削除
        $user->tokens()->delete();

        // 2. ユーザーを削除
        $user->delete();

        return response()->json([
            'message' => 'アカウントを削除しました'
        ], 200);
    }
}