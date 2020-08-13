/**
 * 列传本纪api
 * author shaoliang
 * date 2020/2/6
 * @class BiographyVoApi
 */
class BiographyVoApi extends BaseVoApi
{   
    private biographyVo:BiographyVo = null;
    public showInfo:Object = null;
    public showNum:number = 0;

    private _rewardsQueue:string[] = [];
    public constructor() 
	{
		super();
	}
    /**
     * 当前传记
     */
    public getInfo():Object
    {
        return this.biographyVo.info;
    }
    /**
     * 历史传记
     */
    public getList():Object[]
    {
        return this.biographyVo.list;
    }

    public getBookInfoContainerByInfo(data:any,isMe:boolean= false,uid?:number,nam?:string):BaseDisplayObjectContainer
    {
        let container = new BaseDisplayObjectContainer();

        let cfg = Config.BiographyCfg.getCfgBgId(data.id);

        let base = BaseBitmap.create("biography_base"+cfg.type);
        base.setPosition(0,148);
        container.addChild(base);

        let book = BaseBitmap.create("biography_book"+cfg.type);
        book.setPosition(base.x+base.width/2-book.width/2,0);
        container.addChild(book);

        let nameplate = BaseBitmap.create("biography_nameplate"+cfg.type);
        
        container.addChild(nameplate);

        let titleStr:string = cfg.name;
        let playerName:string;
        let serverstr:string; 
        let datestr:string;
        if (isMe)
        {   
            datestr = App.DateUtil.getFormatBySecond(data.ts,20);
            if (nam)
            {
                playerName = nam;
            }
            else
            {
                playerName = Api.playerVoApi.getPlayerName();
            }
            if (uid)
            {
                serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(uid);
            }
            else
            {
                serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(null);
            }
            
        }
        else
        {   
            datestr = App.DateUtil.getFormatBySecond(data.st,20);
            playerName = data.name;
            serverstr = Api.mergeServerVoApi.getSeverName(data.zid);
        }

        let name = ComponentManager.getTextField(cfg.typeName,TextFieldConst.FONTSIZE_CONTENT_COMMON,cfg.typeNameColor);
        
        container.addChild(name);

        let title = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,0xad3519);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,title,book,[0,39]);
        container.addChild(title);

        let playername = ComponentManager.getTextField(playerName,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
        playername.setPosition(book.x+book.width/2-playername.width/2,book.y+70);
        container.addChild(playername);

        // let ornament = BaseBitmap.create("biography_ornament");
        // ornament.width = playername.width+ornament.width;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,ornament,book,[0,playername.y+playername.height/2-ornament.height/2]);
        // container.addChild(ornament);

       

        let servertext = ComponentManager.getTextField(serverstr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,servertext,book,[0,playername.y+25]);
        container.addChild(servertext);

         let datatext = ComponentManager.getTextField(datestr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,datatext,book,[0,servertext.y+25]);
        container.addChild(datatext);

        if (cfg.type == 1)
        {
            book.x -= 15;

            let addclip = ComponentManager.getCustomMovieClip("biography_type1_add",10,100);
            addclip.blendMode = egret.BlendMode.ADD;
            addclip.setPosition(10,0);
            addclip.playWithTime(0);
            container.addChild(addclip);
            let childnum = container.numChildren;
            for (let i=0; i<childnum; i++)
            {
                container.getChildAt(i).x+=10;
            }
            base.x = 0;
        }
        else
        {
            let addclip = ComponentManager.getCustomMovieClip("biography_type2_add",10,100);
            addclip.blendMode = egret.BlendMode.ADD;
            addclip.setPosition(0,0);
            addclip.playWithTime(0);
            container.addChild(addclip);
        }
        nameplate.setPosition(base.x+base.width/2-nameplate.width/2,base.y);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,name,nameplate,[0,2]);

        return container;
    }
    public checkShowBiographyRewars(rewards:string):void
    {
        let rewardVo = GameData.formatRewardItem(rewards);
        let bioId:string = "";
        for (let i=0; i<rewardVo.length; i++)
        {   
            let oneVo = rewardVo[i];
            if (oneVo.type == 35)
            {   
                if (!GameData.isInArray(String(oneVo.id),this._rewardsQueue))
                {
                    this._rewardsQueue.push(String(oneVo.id));
                }
            }
        }

        this.checkShowRewars();
    }   

    public checkShowRewars():void
    {
        if (this._rewardsQueue.length>0)
        {
            let bioId = this._rewardsQueue.shift()
            if (bioId)
            {   
                let t = this.getLastTimeById(bioId);
                let info = {
                    zid:Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
                    name:Api.playerVoApi.getPlayerName(),
                    level:Api.playerVoApi.getPlayerLevel(),
                    uid:Api.playerVoApi.getPlayerID(),
                    pic:Api.playerVoApi.getPlayePicId(),
                    id:bioId,
                    st:t,
                    title:Api.playerVoApi.getTitleInfo(),
                }
                Api.biographyVoApi.showInfo = info;
                ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
            }
        }
    }

    private getLastTimeById(bid:string):number
    {
        let t = 0;
        let listArray:any[] = Api.biographyVoApi.getList();
        for (let i=0; i<listArray.length; i++)
        {   
            let oneItem = listArray[i];
            if (oneItem.id == bid)
            {
                if (oneItem.ts > t)
                {
                    t = oneItem.ts;
                }
            }
        }

        return t;
    }

    public dispose():void
	{
        this.showInfo = null;
        this.showNum = 0;
        this._rewardsQueue.length = 0;
		super.dispose();
	}
}