/**
 * 英泰文--周年庆
 * date 2019/6/3
 * @author 张朝阳
 * @class AcGroupEnzhounianqingVo
 */
class AcGroupZhounianqingVo extends AcGroupBaseVo {

	public constructor() {
		super();
	}
	public get isShowRedDot(): boolean {
		let acVoList = this.getAcVoList()
		for (let key in acVoList) {
			let acVo = acVoList[key];
			if (acVo.isShowRedDot == true && acVo.isStart) {
				return true;
			}
		}
		return false;
	}
}