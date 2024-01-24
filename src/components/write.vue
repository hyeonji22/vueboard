<template>
    <form novalidate>
    <div class="panel-body">

        <div class="form-group">
            <label>제목</label>
            <input  placeholder="제목을 입력하세요" class="form-control" v-model="title" ref="title" name="title">
        <div class="form-group">
            <label>내용</label>
            <textarea placeholder="내용을 입력하세요"  rows="5" cols="50" v-model="content" name="content" ref="content" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label>작성자</label>
            <input placeholder="작성자를 입력하세요" class="form-control" v-model="writer" name="writer" ref="writer" >
        </div>
         </div>
    </div>
     <div class="col-12">
  </div>
    </form>
   <button type="button" class="btn btn-outline-primary" @click="updateBtn" v-if="$route.params.id">수정</button>  
   <button type="button" class="btn btn-outline-primary" @click="insertBtn" v-else>등록</button>

    <button type="button" class="btn btn-outline-success" @click="$router.push('/')">목록</button>  
   



</template>

<script>
import axios from 'axios'
export default {
     // eslint-disable-next-line
    name:'write',
    data() {
        return {
            id : this.$route.params.id,
            title : '',
            content : '',
            writer : '',
        };
    },
     created() {// 컴포넌트가 생성될 때 getBoard 메서드를 호출
         if(this.id){
             this.getBoard();
         }
    },

    methods: {
        insertBtn(){
            //등록 체크
           if(this.title.trim()=="")
            {
                this.$refs.title.focus();
                return;
            }
            if(this.content.trim()=="")
            {
                this.$refs.content.focus();
                return;
            }
            if(this.writer.trim()=="")
            {
                this.$refs.writer.focus();
                return;
            }
            //등록 전송
            axios.post('/api/write',
            {title:this.title,
             content:this.content,
             writer :this.writer,
             }).then(()=>{this.$router.push('/');
             }).catch(err => {
                console.log(err);
                });
        },
        //상세보기
        getBoard(){
            axios.get(`/api/detail/${this.id}`)
            .then(res=>{
                console.log(res.data[0]);
                this.title = res.data.title;
                this.content = res.data.content;
                this.writer = res.data.writer;
            }).catch(err=>{
                console.log(err);
            });
        },
        //수정체크
        updateBtn(){
             if(this.title.trim()=="")
            {
                this.$refs.title.focus();
                return;
            }
            if(this.content.trim()=="")
            {
                this.$refs.content.focus();
                return;
            }
            if(this.writer.trim()=="")
            {
                this.$refs.writer.focus();
                return;
            }
        //수정 전송
        axios.patch(`/api/write/${this.id}`, 
            {title:this.title,
             content:this.content,
             writer :this.writer,
             }).then(()=>{
                 alert("수정완료");
                 this.$router.push('/');
            }).catch(err=>{
                console.log(err);
            });
    },


}
}
</script>

<style>

</style>