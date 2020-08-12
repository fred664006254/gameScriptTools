class InviteFriendShareView extends CommonView{

	public constructor(){
		super();
	}

	protected getResourceList():string[]{
		return [
            `invitescreenshotbg`,`invitescreenshotcodebg`,`invitescreenshottitle1`,`invitescreenshottitle2`,`firstrec_btnBg`
		];
	}

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }
    
    protected getBgName():string{
        return `invitescreenshotbg`;
    }

    protected getMsgConstEventArr():string[]{
		return [

		];
	}

    protected getNetConstEventArr():string[]{
		return [

		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
        }
    }

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
        }
    }

	public initView():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let title = BaseBitmap.create(`invitescreenshottitle${App.DeviceUtil.isRuntime2() ? 2 : 1}`);
        view.addChild(title);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0,191]);

        let btn = BaseBitmap.create(`firstrec_btnBg`);
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0,193]);

        let shareTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip10`), 32, 0xFFFFFF);
        shareTxt.stroke = 2;
        shareTxt.strokeColor = 0x0864C4;
        view.addChild(shareTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shareTxt, btn);

        let codeTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip2`), 30, 0xFFEB96);
        codeTxt.stroke = 2;
        codeTxt.strokeColor = 0x000000;
        view.addChild(codeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, codeTxt, view, [171,142]);

        let codebg = BaseBitmap.create(`invitescreenshotcodebg`);
        view.addChild(codebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, codebg, view, [78,55]);

        let code = ComponentMgr.getTextField(`${Api.InviteFriendVoApi.getMyCode()}`, 40, 0xFFEB96);
        code.stroke = 2;
        code.strokeColor = 0x000000;
        view.addChild(code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, code, codebg);

        view.addTouchTap(view.hide,view);
    }

    public getCloseBtnName():string{
        return null;
    }

	public dispose():void{
        let view = this;
		super.dispose();
	}
}