/**
 * 泰国泼水节
 * date 2020.3.3
 * @author ycg
 * @class AcGroupPoshuiVo
 */
class AcGroupPoshuiVo extends AcGroupBaseVo {

	public constructor() {
		super();
	}

	public get isShowRedDot(): boolean {
		let acVoList = this.getAcVoList();
		for (let key in acVoList) {
			let acVo = acVoList[key];
			if (acVo && acVo.isShowRedDot == true && acVo.isStart) {
				return true;
			}
		}
		return false;
	}
}