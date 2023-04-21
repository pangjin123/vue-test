<template>
  <q-page class="bg-white column"> <!-- 페이지 안에 넣어야됨 -->
    <!-- 텍스트바 뒷 배경-->
    <div class="row q-pa-sm bg-green">
      <!-- 텍스트 바 -->
      <q-input
            v-model="newbook"
            @keyup.enter="addBook"
            class="col"
            bg-color="white"
            filled
            arria-placeholder="Add Book"
            dense
        >
            <!-- add 버튼 -->
            <template v-slot:append>
                <q-btn @click="addBook" round dense flat icon="add"></q-btn>
            </template>
        </q-input>
    </div>

    <!-- list 보여주기 -->
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="item in books"
        :key="item.title"
        v-ripple
      >
        <q-item-section>  <!-- 책 이름 리스트 -->
          <q-item-label> {{ item.title }} </q-item-label>
        </q-item-section>

        <q-item-section>  <!-- 책 상태 -->
          <q-item-label> {{ item.state }} </q-item-label>
        </q-item-section>
        <q-item-section side> <!-- 대여 버튼 -->
          <q-btn
            dense
            class="green"
            icon="book"
            @click.stop="rentalItem(item)"
          ></q-btn>
        </q-item-section>

        <q-item-section side> <!-- 반납 버튼 -->
          <q-btn
            dense
            class="green"
            icon="keyboard_return"
            @click.stop="returnItem(item)"
          ></q-btn>
        </q-item-section>

        <q-item-section side> <!-- 삭제 버튼 -->
          <q-btn
            dense
            class="green"
            icon="delete"
            @click.stop="removeItem(item)"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import BooklistStore from "src/stores/books";
import { mapActions, mapState } from "pinia";


export default {
    name: "Books",
    title: "Book list",
    data() {
        return {
            newbook: "",
        };
    },
    computed: {
      ...mapState(BooklistStore, ["books"]),
    },
    mounted() { //mapActions에서 listBook 직접 호출
      this.listBook();
    },
    methods: {
      //stores에 book 안에 있는 추가, 상태변경, 삭제 사용
      ...mapActions(BooklistStore, ["insertBook", "listBook", "rentalBook", "returnBook", "removeBook"]),
        async addBook() {   //책 추가
          if(this.newbook){
            //action 저장
            this.insertBook(this.newbook);
            await this.$q.notify({    //추가 메시지
              message: `${this.newbook} 책을 추가하셨습니다`,
              icon:"book",
              color: "green",
            });
            this.newbook="";  //빈칸으로 되돌리기
          }else{
            await this.$q.notify({  //실패 메시지
              message: `책 이름을 입력해주세요`,
              icon:"book",
              color: "green",
            })
          }
          
        },
        async removeItem(item){   //삭제
          await this.$q.notify({    //책을 삭제 했다는 메시지 출력
              message: `${item.title} 책을 삭제하였습니다`,
              icon: "book",
              color: "green",
          });
          this.removeBook(item.id);
          this.newbook="";
        },
        async rentalItem(item) {  //상태 변경
          this.rentalBook(item);
          await this.$q.notify({    //책을 대여했다는 메시지 출력
            message: `${item.title} 책을 대여하였습니다`,
            icon: "book",
            color: "green",
          });
        },
        async returnItem(item) {  //상태 변경
          this.returnBook(item);
          await this.$q.notify({    //책을 반납했다는 메시지 출력
            message: `${item.title} 책을 반납하였습니다`,
            icon: "book",
            color: "green",
          });
        },
    },
}
</script>

<style>
.green {
  color: green;
}
</style>