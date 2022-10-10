<template>
	<view class="">
		<u-modal :show="modalShow" @confirm="confirm" @cancel="$emit('update:modalShow', false)" ref="uModal"
			 showCancelButton>
			<view class="" slot="default">
				<u--form labelPosition="left" labelWidth="auto" :model="model1" :rules="rules" ref="form1">

					<u-form-item label=" 血糖情况" prop="userInfo.sugar" borderBottom ref="item1"
						@click="showSugar = true ">
						<u--input v-model=" model1.userInfo.sugar" disabled disabledColor="#ffffff"
							placeholder="请选择血糖情况" border="none" />
						<u-icon slot="right" name="arrow-right" />
					</u-form-item>

					<u-form-item label="睡眠情况" prop="userInfo.sleep" borderBottom ref="item1" @click="showSleep = true ">
						<u--input v-model="model1.userInfo.sleep" disabled disabledColor="#ffffff" placeholder="请选择睡眠情况"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>

					<u-form-item label="关节情况" prop="userInfo.joint" borderBottom ref="item1" @click="showJoint = true ">
						<u--input v-model="model1.userInfo.joint" disabled disabledColor="#ffffff" placeholder="请选择关节情况"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showSugar" :actions="actions" title="请选择血糖情况" @close="showSugar = false"
					@select="sexSelect">
				</u-action-sheet>
				<u-action-sheet :show="showSleep" :actions="sleepActions" title="请选择睡眠情况" @close="showSleep = false"
					@select="sleepSelect">
				</u-action-sheet>
				<u-action-sheet :show="showJoint" :actions="jointActions" title="请选择关节情况" @close="showJoint = false"
					@select="jointSelect">
				</u-action-sheet>
			</view>

		</u-modal>
	</view>
</template>

<script>
	import {
		diseaseReportPost
	} from '@/api/healthAssess.js'
	export default {
		props: {
			modalShow: {
				required: true,
				type: Boolean
			}
		},
		data() {
			return {
				showSugar: false,
				showSleep: false,
				showJoint: false,
				model1: {
					userInfo: {
						sugar: '',
						sleep: '',
						joint: ''
					},
				},
				actions: [{
						name: '偏低',
					},
					{
						name: '正常',
					},
					{
						name: '正常',
					},
				],
				sleepActions: [{
						name: '差',
					},
					{
						name: '一般',
					},
					{
						name: '良好',
					},
				],
				jointActions: [{
						name: '无',
					},
					{
						name: '轻微',
					},
					{
						name: '中等',
					},
					{
						name: '严重',
					},
				],

				rules: {
					'userInfo.sugar': {
						type: 'string',
						required: true,
						message: '请填写血糖情况',
						trigger: ['blur', 'change']
					},
					'userInfo.sleep': {
						type: 'string',
						required: true,
						message: '请填写睡眠情况',
						trigger: ['blur', 'change']
					},
					'userInfo.joint': {
						type: 'string',
						required: true,
						message: '请填写关节情况',
						trigger: ['blur', 'change']
					},

				},
			}
		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sugar = e.name
				this.$refs.form1.validateField('userInfo.sugar')
			},
			sleepSelect(e) {
				this.model1.userInfo.sleep = e.name
				this.$refs.form1.validateField('userInfo.sleep')
			},
			jointSelect(e) {
				this.model1.userInfo.joint = e.name
				this.$refs.form1.validateField('userInfo.joint')
			},
			onReady() {
				//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
				this.$refs.form1.setRules(this.rules)
			},
			confirm() {
				this.$refs.form1.validate().then(res => {
					diseaseReportPost(this.model1.userInfo).then(res => {
						if (res === null) {
							uni.$u.toast('汇报成功！')
							this.model1.userInfo = {}
							this.$emit('update:modalShow', false)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})

			},
		}
	}
</script>

<style>
</style>
