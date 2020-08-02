<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- ----------------标题 ------------------->
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!--------------------- 图片 ----------------->
        <el-form-item label="图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--================= 状态===================-->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},
  data() {
    return {
      //上传完成的时候图片的地址
      imageUrl: "",
      //form后端的需求
      form: {
        id: 0,
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
     ...mapActions({
      requestList: "banner/requestList",
    }),
    //---------------处理图片------------------
    changeImg(e) {
      console.log(e);
      //file是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //重置
    empty() {
      this.form = {
        id: 0,
        title: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    //取消添加/修改
    cancel() {
      this.info.show = false;
      //如果不是添加就置空一下
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      // console.log(1111111);
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取其中某一条数据
    //如果提示缺少必要条件,那就是没有获取某一条数据
    getDetail(id) {
      // console.log(id);
      requestBannerDetail({id:id}).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    // 修改
    update() {
      requestBannerUpdate(this.form).then(res=>{
        if(res.data.code==200){
          successAlert("添加成功")
          //置空
          this.empty()
          //关闭弹框
          this.cancel()
          //发起请求列表数据
          this.requestList()
        }
      })
    },
  },
  mounted() {},
};
</script>
<style scoped lang="stylus">
.add >>> .el-upload {
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>