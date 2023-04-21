import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from "quasar";  //로컬스토리지

export default defineStore("Booklist", {
    state:() => ({
        books:[],
    }),

    getters: {

    },

    actions: {
        listBook() {        //새로고침 해도 책 리스트 보이기
            this.books = LocalStorage.getItem("book");
        },

        insertBook(title) {     //책 추가
            if(this.books) {
                this.books.unshift({
                    id: uid(),
                    title,
                    done:'Y',
                    state: "보유중"
                });
            }else {
                this.books.push({
                    id: uid(),
                    title,
                    done: 'Y',
                    state: "보유중"
                })
            }

            LocalStorage.set("book", this.books)
        },

        removeBook(id) {        //책 삭제
            const idx = this.books.findIndex(book=>book.id == id);
            //삭제 array.splice(시작 index, 제거index)
            this.books.splice(idx,1);
            LocalStorage.set("book", this.books);
        },

        rentalBook(item) {      //상태 변경 (대여중)
            const idx = this.books.findIndex(book=>book == item);
            if(item.done == 'Y') {
              item.done = 'N';
              item.state = "대여중";
            };
            LocalStorage.set("book", this.books);
        },

        returnBook(item) {      //상태 변경 (보유중)
            const idx = this.books.findIndex(book=>book == item);
            if(item.done == 'N'){
              item.done = 'Y';
              item.state = "보유중";
            };
            LocalStorage.set("book", this.books);
        },
    }
})