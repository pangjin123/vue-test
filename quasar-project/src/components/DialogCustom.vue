<template>
  <q-dialog v-model="dialog">
    <q-card class="q-dialog-plugin">
        <!-- 헤더와 해당 타이틀의 id -->
        <q-card-section>
            <div class="text-h6">내용 수정</div>
            <div class="text-subtitle2"> {{ editTask.id }}</div>
        </q-card-section>

        <!-- 내용 수정 텍스트 바-->
        <q-card-section>
            <q-input
                v-model="editTask.title"
                @keyup.enter="onOKClick"
            ></q-input>
        </q-card-section>

        <!-- OK버튼과 cancel 버튼 -->
        <q-card-section align="right"> 
            <q-btn
                color="primary"
                unelevated
                dense
                label="OK"
                @click="onOKClick"
            />
            <q-btn
                unelevated
                dense
                color="primary"
                label="Cancel"
                @click="onCancelClick"
            />
        </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "DialogCustom",
    props: ['editTask', 'origin'],
    emits: ['onInput'],
    data() {
        return {
            dialog: false,
        };
    },
    mounted() {

    },
    watch:{

    },
    methods: {
        onOKClick() {
            if (!this.editTask.title) this.editTask.title = this.origin;
            this.$emit("onInput", this.editTask);
            this.dialog = false;
        },
        onCancelClick() {
            (this.editTask.title = this.origin),
            (this.dialog = false);
        },
    },
});
</script>

<style></style>