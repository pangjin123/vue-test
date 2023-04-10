<template>
    <!-- 타이틀 -->
  <q-card-section class="row text-center">
    <q-card-section class="col text-h4 text-primary">
        {{ header || "welCome" }} 
        <!-- 수정 버튼 -->
        <q-btn
            v-if="editing"
            @click="doEdit(false)"
            unelevated
            rounded
            icon-right="clear"
            label="Cancel"
        ></q-btn>

        <!-- 추가 버튼 -->
        <q-btn
            v-else
            @click="doEdit(true)"
            color="primary"
            nuelevated
            rounded
            icon-right="send"
            label="Add Item"
        ></q-btn>
    </q-card-section>
  </q-card-section>

    <!-- 아이템 추가 -->
    <q-card-section class="row justify-center">
        <q-card-section v-if="editing" class="col-8 col-md-3">
            <q-input
                v-model="newItem"
                @keyup.enter="saveItem"
                label="아이템 추가"
            ></q-input>
        </q-card-section>

        <!-- 높은 우선순위 설정 -->
        <q-card-section v-if="editing" class="col-4 col-md-3">
            <q-checkbox
                class="q-pa-none"
                :disable="newItem.length == 0 ? true : false"
                v-model="newItemHightPriority"
                :true-value="true"
                :false-value="false"
                label="높은 우선순위"
            ></q-checkbox>
        </q-card-section>

        <!-- 내용 저장 -->
        <q-card-section v-if="editing" class="col-12 col-md-3">
            <q-btn outline rounded color="privary" @click="saveItem()" label="아이템 저장"></q-btn>
        </q-card-section>
    </q-card-section>


    <!-- 구매 목록 -->
  <q-card-section>
    <q-list bordered>
        <q-item
            v-for="item in reversedItems"
            :key="item.id"
            @click="togglePurchased(item)"
            class="rounded-border"
            :class="{strikeout:item.purchased, priority:item.highPriority}"
            dense
            padding
            clickable
            v-ripple
        >
            <q-item-section>
                {{ item.label }}
            </q-item-section>
        </q-item>
    </q-list>
  </q-card-section>

    <!-- items가 없을때 내용보여주기 -->
  <q-item-section class="row text-center">
    <q-card-section>
        <span v-if="items.length === 0">
            모든 상품을 구매하셨군요! 새 상품을 담아보시죠!</span>
    </q-card-section>
  </q-item-section>

</template>

<script>
export default {
    name: "ShoppingList",
    title: "쇼핑 리스트",
    data() {
        return {
            header:"Shopping List App", //타이틀

            items : [       //구매 목록
            //     { id: 1, label: "10 party hats", purchased: true, highPriority: false },
            //     { id: 2, label: "2 board games", purchased: true, highPriority: false },
            //     { id: 3, label: "20 cups", purchased: false, highPriority: true },
            ],

            editing:false,  //수정
            newItem:"",     //추가
            newItemHightPriority:false,
        }
    },
    computed : {
        reversedItems() {
            return [ ...this.items ].reverse();
        }
    },
    methods :{
        togglePurchased(item) {     //구매 목록 토글 메소드
            item.purchased = !item.purchased;
        },
        doEdit(editing) {   //추가 수정 메소드
            this.editing = editing;
            this.newItem = "";
            this.newItemHightPriority = false;
        },

        async saveItem() {      //구매 목록에 추가
            if(this.newItem.length == 0) return;
            this.items.push({
                id: this.items.length + 1,
                label: this.newItem,
                highPriority: this.newItemHightPriority,
            });
            //notify
            await this.$q.notify({
                color: "primary",
                icon: "done",
                message: ` <span style="color: white"><strong style="color: yellow">${this.newItem}</strong> 상품을 담았습니다. </span>`,
                html: true,
            });
            this.newItem = "";
            this.newItemHightPriority = false;
        }
    },
}
</script>

<style>
.strikeout{
    text-decoration: line-through;
    color: #b8c2cc;
}
.priority{
    color: #de751f;
    font-weight: 600;
}
</style>