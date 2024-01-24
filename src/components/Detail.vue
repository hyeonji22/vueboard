<template>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">{{board.id}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">제목</th>
            <td>{{board.title}}</td>
            </tr>
            <tr>
            <th scope="row">내용</th>
            <td>{{board.content}}</td>
            </tr>
            <th scope="row">작성자</th>
            <td>{{board.writer}}</td>
           
            <tr>
            <th scope="row">작성날짜</th>
      <td colspan="2">{{ board.updatedate ? board.updatedate.replace('T', ' ').split('.')[0] : '' }}</td>

      
            </tr>
        </tbody>
    </table>
    <button type="button" class="btn btn-outline-primary"  @click="$router.push(`/write/${board.id}`)">수정</button>
    <button type="button" class="btn btn-outline-secondary" @click="deleteBtn">삭제</button>
    <!-- <button type="button" class="btn btn-outline-success" @click="$router.push('/${board.id}')">목록</button>   -->
    <button type="button" class="btn btn-outline-success" @click="boardlist">목록</button>  
</template>

<script>
import axios from 'axios';
// import axios from 'axios';
export default {
    // eslint-disable-next-line
    name  : 'detail',
    data() {
        return {
            board:{},
            id : this.$route.params.id,
            page : this.$route.params.page
        };
    },
    created() {
    this.page = this.$route.params.page;
    this.getBoard();
    },
    methods: {
        //상세보기
        getBoard(){
            axios.get(`/api/detail/${this.id}`)
            .then(res=>{
                console.log(res.data[0]);
                this.board = res.data;
            });
        },
        //삭제
        deleteBtn(){
            axios.delete(`/api/write/${this.id}`)
                .then(()=>{
                this.$router.push('/');
        });
        },
        //목록
        boardlist(){
             this.$router.push(`/board/${this.page}`);
        }
    },

}
</script>

<style>

</style>