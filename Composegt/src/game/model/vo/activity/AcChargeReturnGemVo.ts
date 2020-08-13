class AcChargeReturnGemVo extends AcBaseVo {
    public flag: number = 0;
    public red: number = 0;
    public initData(data: any): void {
        super.initData(data);
    }
	/**
	 * 是否显示活动icon，设置后自动显示或者隐藏活动
	 */
    public get isShowIcon(): boolean {
        return this.flag <= 0;
    }

	/**
	 * 检测活动是否显示红点，true：显示
	 */
    public get isShowRedDot(): boolean {
        return this.red === 1;
    }
    public dispose(): void {
        super.dispose();
    }
}