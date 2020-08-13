/**
* 江湖声望单个头衔 item
* date 2020.7.8
* author ycg
* @name NewAtkraceCrossFamePopupItem
*/
class NewAtkraceCrossFamePopupItem extends ScrollListItem{

    private _data:any = null;
    private _itemIndex:number = 0;
    private _headEmptContainer:BaseDisplayObjectContainer = null;
    private _headContainer:BaseDisplayObjectContainer = null;
    private _nameContainer:BaseDisplayObjectContainer = null;

    public constructor() {
        super();
    }

    private get code():string{
        return Api.atkracecrossVoApi.newcrossCode;
    }

    private get aid():string{
        return "newCrossServerAtkRace";
    }

    private get vo():AcNewCrossServerAtkRaceVo{
        return <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initItem(index: number, data: any, param?: any): void {
        this._itemIndex = index;
        this._data = data;

        let isFirst = false;
        let scale = 0.75;
        if (data.lineNum == 1 && data.isFirst){
            scale = 1;
            isFirst = true;
        }
        this.width = 103 * scale;
        this.height = 100 * scale + 30;

        let headEmptContainer = new BaseDisplayObjectContainer();
        headEmptContainer.width = 103;
        headEmptContainer.height = 100;
        let bg = BaseBitmap.create("head_circle_bg");
        headEmptContainer.addChild(bg);
        let head = BaseBitmap.create("user_head999");
        head.y = -7;
        head.setScale(2/3);
        headEmptContainer.addChild(head);
        this._headEmptContainer = headEmptContainer;

        headEmptContainer.setScale(scale)
        this.addChild(headEmptContainer);

        let headContainer = new BaseDisplayObjectContainer();
        headContainer.width = 103;
        headContainer.height = 100;
        headContainer.setScale(scale);
        this.addChild(headContainer);
        this._headContainer = headContainer;

        let alphaBg = BaseBitmap.create("public_alphabg")
        alphaBg.width = this.width;
        alphaBg.height = this.height;
        this.addChild(alphaBg);
        alphaBg.addTouchTap(this.titleClick, this, [index + 1]);

        let nameContainer = new BaseDisplayObjectContainer();
        this.addChild(nameContainer);
        nameContainer.visible = false;
        this._nameContainer = nameContainer;
        let nameSize = 14;
        let nameBg = BaseBitmap.create("newcrossatkrace_titlenamebg");
        nameBg.name = "nameBg";
        if (isFirst){
            nameBg.width = nameBg.width + 40;
            nameBg.height = 20
            nameSize = 18;
        }
        nameContainer.addChild(nameBg);
        nameContainer.width = nameBg.width;
        nameContainer.height = nameBg.height;
        nameContainer.setPosition(this.width/2 - nameBg.width/2 - 5, this.height - 25);

        let name = ComponentManager.getTextField("", nameSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
        nameContainer.addChild(name);
        name.name = "name";

        this.update();
    }

    public update():void{
        let lineNum = this._data.lineNum;
        let mapInfo = Api.atkracecrossVoApi.getFameMapInfoByFloor(lineNum);
        if (!mapInfo){
            return ;
        }
        let data = mapInfo[this._itemIndex];
        if (data.uid){
            this._headEmptContainer.visible = false;
            this._nameContainer.visible = true;
            this._headContainer.visible = true;
            let nameBg = <BaseTextField>this._nameContainer.getChildByName("nameBg");
            let name = <BaseTextField>this._nameContainer.getChildByName("name");
            if (data.uid == Api.playerVoApi.getPlayerID()){
                name.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            }
            else{
                name.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            name.text = data.name;
            name.x = nameBg.x + nameBg.width/2 - name.width/2;
            name.y = nameBg.y + nameBg.height/2 - name.height/2;
            let headContainer = <BaseDisplayObjectContainer>this._headContainer.getChildByName("headContainer");
            if (headContainer){
                headContainer.dispose();
            }
            headContainer = Api.playerVoApi.getPlayerCircleHead(data.pic, data.ptitle);
            this._headContainer.addChild(headContainer);
            headContainer.name = "headContainer";
        }
        else{
            this._headEmptContainer.visible = true;
            this._nameContainer.visible = false;
            this._headContainer.visible = false;
        } 
    }

    private titleClick(evt:any, index:number):void{
        App.LogUtil.log("titleClick "+index);
        if (this.vo && !this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return ;
        }
        let mapInfo = Api.atkracecrossVoApi.getFameMapInfoByFloor(this._data.lineNum);
        let uid = null;
        if (mapInfo && mapInfo[this._itemIndex] && Object.keys(mapInfo[this._itemIndex]).length > 0){
            //席位有人
            let info = mapInfo[this._itemIndex];
            uid = info.uid;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSFAMEHOLDPOPUPVIEW, {data: this._data, index: this._itemIndex, uid: uid, aid: this.aid, code: this.code});
    }

    public playAni():void{
    //     let lineNum = this._data.lineNum;
    //     let mapInfo = Api.sixsection1VoApi.getTitleInfoByFloor(lineNum);
    //     let data = mapInfo[this._itemIndex];
    //     let container = this._headEmptContainer;
    //     if (data.uid){
    //         container = this._headContainer;
    //     }
    //     let time = 400;
    //     let scale = container.scaleX;
    //     let bigScale = scale + 0.1;
    //     egret.Tween.get(container, {loop:false}).to({scaleX: bigScale, scaleY: bigScale}, time).to({scaleX: scale, scaleY: scale, alpha: 0.5}, time).to({scaleX: bigScale, scaleY: bigScale, alpha: 1}, time).to({scaleX: scale, scaleY: scale}, time);
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }

    public dispose():void{
        this._itemIndex = 0;
        this._data = null;
        this._headContainer = null;
        this._headEmptContainer = null;
        this._nameContainer = null;

        super.dispose();
    }
}