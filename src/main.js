'use strict';

/**
 * Todo 入力/出力
 * @createTdInpt 登録Todoの入力
 * @dispTdLists  TodoListsの一覧表示
 */ 
const createTdInpt = document.getElementById('create_Todo_Input');
const dispTdLists = document.getElementById('disp_Todo_Lists');

/**
 * Radio入力
 * @dispAllTskRadio   全件表示
 * @dispMaintTskRadio メンテナンスタスクのみ表示
 * @dispCompTskRadio  完了タスクのみ表示
 * 
 * Button入力
 * @createTdBtn Todoリスト新規作成
 */ 

const dispAllTskRadio = document.getElementById('disp_All_Tasks_Radio');
const dispMaintTskRadio = document.getElementById('disp_Mainte_Tasks_Radio');
const dispCompTskRadio = document.getElementById('disp_Compelete_Tasks_Radio');
const createTdBtn = document.getElementById('create_Todo_Button');

const todos = [];

const createTdList = todo => {
    const isValue = (element) => element === todo;
    const id = todos.findIndex(isValue);
    console.log(todos.findIndex(isValue)); //indexチェック
    const tdElements ='<tr><td id="todo_List_Id_' + id + '">' + id + '</td><td id="todo_List_Task">' + todos[id].content + '</td><td><button id="todo_Status_Button_' + id + '">' + todos[id].state + '</button></td> <td><button id="todo_Delete_Button_' + id + '">' + todos[id].delete + '</button></td></tr > '
    dispTdLists.insertAdjacentHTML("beforeend", tdElements);
}

createTdBtn.addEventListener('click', () => {
    if (!createTdInpt.value) { 
    return;
    }
    console.log(createTdInpt.value); //入力チェック
    const todo = {
        content: createTdInpt.value,
        state: '実行中',
        delete: '削除',
    };
    todos.push(todo);
    createTdInpt.value = '';
    createTdList(todo);
})
