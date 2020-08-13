class ZeroGiftItem extends ScrollListItem {
    constructor() {
        super();
    }
    protected initItem(index: number, data: RewardItemVo) {
        let icon = GameData.getItemIcon(data, true);
        icon.scaleX = icon.scaleY = 0.7;
        this.addChild(icon);
    }
    public getSpaceX(): number {
        return 66;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 12;
    }
    public dispose(): void {
        super.dispose();
    }
}