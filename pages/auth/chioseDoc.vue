<template>
	<view class="main-contianer">
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="chiose-title">
			请完善您的个人信息
		</view>

		<view class="">


			<!-- <view class="picker-contianer" @click="showPicker">
				<u--input v-model="docName" borderBottom disabled placeholder="请选择医生">
				</u--input>
			</view> -->

			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="form1"
				:labelStyle="{fontSize:'40upx',letterSpacing:'6upx'}" :labelWidth="'110px'">
				<u-form-item label="姓名" prop="name" borderBottom ref="item1">
					<u--input class="input-color" v-model="userInfo.name" border="none"></u--input>
				</u-form-item>

				<u-form-item label="电话号码" prop="phone" borderBottom ref="item1">
					<u--input disabled v-model="userInfo.phoneNumber" border="none"></u--input>
				</u-form-item>
				<u-form-item label="性别" prop="sex" borderBottom @click="showSex = true" ref="item1">
					<u--input v-model="userInfo.sex" disabled placeholder="请选择性别" border="none"></u--input>
				</u-form-item>
				<u-form-item label="医生" prop="did" borderBottom @click="pickerShow = true" ref="item1">
					<u--input v-model="docName" disabled placeholder="请选择医生" border="none">
					</u--input>
				</u-form-item>

				<u-form-item label="出生日期" prop="birthday" borderBottom ref="item1">
					<uni-datetime-picker class="input-color" type="date" :clear-icon="false" v-model="userInfo.birthday"
						@maskClick="maskClick" />
				</u-form-item>

				<u-form-item label="身高(cm)" prop="height" borderBottom ref="item1">
					<u--input class="input-color" :maxlength='3' type="number" v-model="userInfo.height" border="none">
					</u--input>
				</u-form-item>

				<u-form-item label="体重(kg)" prop="weight" borderBottom ref="item1">
					<u--input class="input-color" :maxlength='3' type="number" v-model="userInfo.weight" border="none">
					</u--input>
				</u-form-item>

			</u--form>


			<view class="btn-contianer">
				<button type="primary" @click="goNext">下一步</button>
			</view>

		</view>

		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>

		<u-picker :show="pickerShow" :columns="columns" @close="pickerShow = false" @confirm="pickerConfirm"
			@cancel="pickerShow = false"></u-picker>

	</view>
</template>

<script>
	import {
		getDocInfo,
		setDoc,
		userRegister,
        login
	} from '../../api/auth.js'
	export default {
		data() {
			return {
				pageLoading:false,
				pickerShow: false,
				columns: [
					[]
				],
				docList: [],
				loading: false,
				docName: '',
				showSex: false,
				userInfo: {
					name: '',
					phoneNumber: '',
					sex: '',
					did: 0,
					birthday: '',
					height: '',
					weight: ''
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
				],
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					sex: {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					did: {
						type: 'number',
						required: true,
						message: '请填写身高',
						trigger: ['blur', 'change']
					},
					height: {
						type: 'number',
						required: true,
						message: '请填写身高',
						trigger: ['blur', 'change']
					},
					weight: {
						type: 'number',
						required: true,
						message: '请填写体重',
						trigger: ['blur', 'change']
					}
				},
				radio: '',
				switchVal: false
			};
		},
		onLoad(e) {
			console.log(e);
			this.userInfo.phoneNumber = uni.getStorageSync('userPhone')
			this.fetchDocInfo()
		},
		methods: {
			sexSelect(e) {
				this.userInfo.sex = e.name
				this.$refs.form1.validateField('sex')
			},
			async fetchDocInfo() {
				const res = await getDocInfo()
				if (res) {
					this.docList = res
					res.forEach(item => {
						this.columns[0].push(item.name)
					})
				}
			},
			//选择医生
			pickerConfirm(val) {
				this.pickerShow = false
				this.docName = val.value[0]
				this.userInfo.did = this.docList[val.indexs[0]].id
			},
			goNext() {
				
				this.$refs.form1.validate().then(res => {
					if (this.userInfo.birthday === "" || this.userInfo.did === 0) {
						uni.$u.toast('校验失败')
						return
					} else {
						this.pageLoading = true
						userRegister(this.userInfo).then(res => {
							uni.redirectTo({
							    url:'/pages/auth/login'
							})
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})

			},
			maskClick(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-contianer {
		padding: 40upx;
	}

	.chiose-title {
		font-size: 45upx;
		letter-spacing: 6upx;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
		border: 1px solid #070707;
	}

	.btn-contianer {
		margin-top: 60upx;
	}

	.input-color {
		background-color: rgb(245, 247, 250);
	}
</style>
