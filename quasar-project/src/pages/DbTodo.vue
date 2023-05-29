<template>
  <q-page class="bg-grey-3 column"> <!-- 페이지 안에 넣어야됨 -->
    <!-- 텍스트바 뒷 배경-->
    <div class="row q-pa-sm bg-primary">
        <!-- 텍스트 -->
        <q-input
            v-model="newTask"
            @keyup.enter="addDbTask"
            class="col"
            bg-color="white"
            filled
            arria-placeholder="Add task"
            dense
        >
            <!-- add 버튼 -->
            <template v-slot:append>
                <q-btn @click="addDbTask" round dense flat icon="add"></q-btn>
            </template>
        </q-input>
    </div>
    
    <!-- 리셋 버튼 -->
    <q-btn label="reset" @click="resetDB"></q-btn>

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
                @click.stop="removeDBItem(item)"
                ></q-btn>
            </q-item-section>
        </q-item>
        <!-- 퀘이사에 있는 무한 스크롤을 가져온다-->
        <div v-intersection="onIntersection" v-if="tasks.length"></div>
    </q-list>    
        <!-- 리스트가 없을 시 -->
    <div v-if="!tasks.length" class="no-tasks absolute-center">
        <q-icon name="check" size="100px" color="primary" />
        <div class="text-h5 text-primary text-center">No list</div>
    </div>
    <!-- 컴포넌트 3번 -->
    <dialog-custom 
        ref="dialog" 
        :edit-task="editTask" 
        :origin="origin" 
        @onInput="editDBTodo">
    </dialog-custom>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import todoApi from "src/apis/todoApi";
import DialogCustom from '../components/DialogCustom.vue';  //컴포넌트 1번

export default  defineComponent({   //defineComponent로 컴포넌트 명시
    components: { DialogCustom },
    name: "Todo",
    title: "DB Todo list",
    data() {
        return {
            newTask: "",
            tasks: [],
            totalCount: 0,
            editTask:null,
            origin:null,
        };
    },
    computed: {},
    mounted() {
        this.fetchData();
    },
    methods: {
        //추가
        async addDbTask() {
            if(!this.newTask) { //newTask가 false면
                this.$refs.list.focus();    //포커스 외부로 돌림
            }
            const payload = {   //payload에 newTask값 넣기
                title: this.newTask,
            };
            //저장
            const result = await todoApi.create(payload);
            if(result.status == 200) {
                if(result.data.id) {
                    this.tasks.unshift({    //unshift() 메서드는 새로운 요소를 배열의 맨 앞쪽에 추가하고 새로운 길이를 반환한다.
                        id: result.data.id,
                        title: this.newTask,
                        done: "N",
                    });
                    this.totalCount++;
                }
                await this.$q.notify({      //알림
                    message: `${this.newTask} 추가하셨습니다.`,
                    icon: "home",
                    color: "primary",
                });
                this.newTask = "";
            }
        },

        //목록가져오기
        async fetchData() {
            const len = 5;
            const lastId = this.tasks.length ? this.tasks[this.tasks.length - 1].id : 0;

            if(this.tasks.length > 0 && this.tasks.length == this.totalCount) {
                console.log("fatchData 호출안함", this.tasks.length, this.totalCount);
                return false;    
            }
            const payload = {
                lastId,
                len,
            };
            const result = await todoApi.list(payload);
            if(result.data && result.data.list) {
                this.tasks = [...this.tasks, ...result.data.list];
                this.totalCount = result.data.totalCount;
            }
        },

        //intersection
        async onIntersection(entry) {
            if (entry.inIntersecting) {
                this.$q.loading.show(); //로딩바 실행
                await this.fetchData(); //리스트 불러오기
                this.$q.loading.hide(); //로딩바 감추기
            }
        },
        //다이얼로그 열기
        openDialog(item) {
            this.$refs.dialog.dialog = true;
            this.editTask = item;
            this.origin = this.editTask.title;
        },
        //수정
        async editDBTodo(item) { 
            //배열에서 수정하되 done은 'n'으로
            const idx = this.tasks.findIndex((task) => task == item);
            item.done = "N";
            this.tasks.splice(idx, 1, item);

            if(this.editTask.title != this.origin) {
                //타이틀이 다를때만 수정
                await todoApi.update(item);
                await this.$q.notify({
                    message: `${item.title} 수정하셨습니다.`,
                    icon: "home",
                    color: "primary",
                });
            }
        },
        //삭제
        async removeDBItem(item) {
            const idx = this.tasks.findIndex((task) => task.id == item.id);
            //삭제 array.splice(시작 index, 제거 index, 추가 요소)
            this.tasks.splice(idx, 1);
            const result = await todoApi.remove(item);
            if(result.status == 200) {
                await this.$q.notify({
                    message: `${item.title} 삭제하셨습니다.`,
                    icon: "home",
                    color: "primary",
                });
            }
        },
        //더미리스트 만들기
        async resetDB() {
            if(this.tasks) {
                this.tasks = [];
            }
            const payload = {
                title: "todo_",
                done: "N",
                len: 100,
            };
            const result = await todoApi.reset(payload);
            if(result.status == 200) {
                console.log(result.status);
                this.fetchData();
            }
        },
    },
});
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