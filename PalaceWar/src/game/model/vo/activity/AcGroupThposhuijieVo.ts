/**
 * 泰国--泼水节
 * date 2019/3/4
 * @author 张朝阳
 * @class AcGroupThposhuijieView
 */
class AcGroupThposhuijieVo extends AcGroupBaseVo {

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