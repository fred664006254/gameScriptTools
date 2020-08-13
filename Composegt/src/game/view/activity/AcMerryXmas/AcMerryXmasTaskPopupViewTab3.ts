class AcMerryXmasTaskPopupViewTab3 extends AcMerryXmasTaskPopupViewTab {
    protected _tab = 3;

    protected getTabIndex():number{
		return 3;
    }
    
    public dispose(): void {
        this._tab = 3;
        super.dispose();
    }
}