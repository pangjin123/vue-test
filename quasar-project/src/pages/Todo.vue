<template>
  <q-page class="bg-grey-3 column"> <!-- 페이지 안에 넣어야됨 -->
    <!-- 텍스트바 뒷 배경-->
    <div class="row q-pa-sm bg-primary">
        <!-- 텍스트 -->
        <q-input
            v-model="newTask"
            @keyup.enter="addTask"
            class="col"
            bg-color="white"
            filled
            arria-placeholder="Add task"
            dense
        >
            <!-- add 버튼 -->
            <template v-slot:append>
                <q-btn @click="addTask" round dense flat icon="add"></q-btn>
            </template>
        </q-input>
    </div>
  
    <!-- list 보여주기 -->
    <q-list class="bg-white" separator bordered>
        <q-item
            v-for="item in tasks"
            :key="item.title"
            @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
            :class="{ 'done bg-blue-1': item.done == 'Y'}"
            v-ripple
            clickable
        >
            <q-item-section avatar>
                <!-- 체크 박스 -->
                <q-checkbox
                    v-model="item.done"
                    color="primary"
                    class="no-pointer-event"
                    true-valu="Y"
                    false-value="N"
                    dense
                ></q-checkbox>
            </q-item-section>
            <q-item-section>    <!-- 리스트 안에 타이틀 표시 -->
                <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>

                <!-- 수정 아이콘 -->
            <q-item-section v-if="item.done=='Y'" side>
                <q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click.stop="openDialog(item)"
                >
                </q-btn>
            </q-item-section>

                <!-- 삭제 버튼(Y일때 보임) -->
            <q-item-section v-if="item.done=='Y'" side>
                <q-btn
                flat
                round
                dense
                color="red"
                icon="delete"
                @click.stop="removeItem(item.id)"
                ></q-btn>
            </q-item-section>
        </q-item>
    </q-list>
    <!-- 컴포넌트 3번 -->
    <dialog-custom ref="dialog" :edit-task="editTask" :origin="origin" @onInput="editTodo">
    </dialog-custom>
  </q-page>
</template>

<script>
import useTodoStore from "src/stores/todo";
import { mapActions, mapState } from "pinia";
import DialogCustom from '../components/DialogCustom.vue';  //컴포넌트 1번

export default {
    components: { DialogCustom }, //컴포넌트 2번
    name: "Todo",
    title: "Todo list",
    data() {
        return {
            newTask: "",

            editTask:null,
            origin:null,
        };
    },
    computed: {
        ...mapState(useTodoStore, ["tasks"]),
    },
    mounted() { //mapActions의 listTodo함수 직접 호출
        this.listTodo();
    },
    methods: {
        ...mapActions(useTodoStore, ["insertTodo", "removeTodo", "listTodo", "editTodo"]),  //stores에 todo 안에 있는 추가 삭제 사용
        async addTask() {   //추가
            if(this.newTask) {
                this.insertTodo(this.newTask);  //추가
                await this.$q.notify({      //추가 메시지
                    message: `${this.newTask} 추가하셨습니다`,
                    icon:"home",
                    color: "primary",
                });
                this.newTask="";    //텍스트 빈칸
            }else{
                await this.$q.notify({  //실패 메시지
                    message: `내용은 필수입력입니다`,
                    icon:"warning",
                    color: "red",
                });
            }
        },
        removeItem(id) {    //삭제
            this.removeTodo(id);
            this.newTask="";
        },
        
        openDialog(item) {
            this.$refs.dialog.dialog = true;    //DialogCustom.vue 컴포넌트의 dialog 변수 접근 및 값 변경
            this.editTask = item;   // 현재 todo 객체 보냄
            this.origin = this.editTask.title;  //todo객체의 타이틀 보냄
        }
    }
}
</script>

<style lang="scss">
.done {
    .q-item__label{
        text-decoration: line-through;
        color: #bbb;
    }
}
.no-tasks {
    opacity: 0.5;;
}
</style>