<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-----------------一级分类 ----------------->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId">
            <el-option label="----请选择----" value disabled></el-option>
            <!------- 动态数据----- -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-----------------二级分类 ----------------->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="form.second_cateid">
            <el-option label="----请选择----" value disabled></el-option>
            <!------- 动态数据----- -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- ----------------商品名称 ------------------->
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- ----------------价格 ------------------->
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- ----------------市场价格 ------------------->
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <!-----------------商品规格 ----------------->
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="form.specsid" @change="changeSpecsId">
            <el-option label="----请选择----" value disabled></el-option>
            <!------- 动态数据----- -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-----------------规格属性 ----------------->
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="form.specsattr">
            <el-option label="----请选择----" value disabled></el-option>
            <!------- 动态数据----- -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-----------------是否新品 ----------------->
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-----------------是否热卖 ----------------->
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!----------------- 状态----------------->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <!-- ---------------底部按钮------------------ -->
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
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类的一级列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
      //编辑器对象
      editor: null,
      //二级分类的数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      //上传完成的时候图片的地址
      imageUrl: "",
      //form后端的需求
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
    };
  },
  methods: {
    ...mapActions({
      //分类一级列表需要请求cate的数据
      requestCateList: "cate/requestList",

      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品列表
      requesGoodstList: "goods/requestList",
      //获取商品总数
      requestGoodsCount: "goods/requestTotal",
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
    //-----------------重置-----------------
    empty() {
      //二级分类的数组
      this.secondCateArr = [];
      //商品规格属性值
      this.attrsArr = [];
      //上传完成的时候图片的地址
      this.imageUrl = "";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "123",
      };
    },
    //----------------取消添加/修改---------------
    cancel() {
      this.info.show = false;
      //如果不是添加就置空一下
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.requesGoodstList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //--------------获取其中某一条数据--------------
    //如果提示缺少必要条件,那就是没有获取某一条数据
    getDetail(id) {
      // console.log(id);
      requestGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    //--------------- 修改-------------------
    update() {
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          //置空
          this.empty();
          //关闭弹框
          this.cancel();
          //发起请求列表数据
          this.requesGoodstList();
        }
      });
    },
    //---------------点击一级分类获取二级分类--------------
    changeFirstCateId() {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    //--------------商品规格发生改变-----------------
    changeSpecsId(id) {
      console.log(id);
      //获取点击的商品的id
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrsArr = this.specList[index].attrs;
      //置空
      this.form.specsattr = [];
    },
  },
  mounted() {
    //获取商品分类列表
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    //进入页面直接获取所有的规格数据
    this.requestSpecList(true);
  },
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