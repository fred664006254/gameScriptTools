/**
 * 金鼠闹春
 * @author 钱竣
 * @class AcGroupSpring2020Vo
 */
class AcGroupSpring2020Vo extends AcGroupBaseVo {

	public constructor() {
		super();
	}

	public get isShowRedDot(): boolean {
		let acVoList = this.getAcVoList()
		for (let key in acVoList) {
			let acVo = acVoList[key];
			if (acVo && acVo.isShowRedDot == true && acVo.isStart) {
				return true;
			}
		}
		return false;
	}
}