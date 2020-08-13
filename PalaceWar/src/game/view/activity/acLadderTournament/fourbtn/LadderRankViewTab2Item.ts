class LadderRankViewTab2Item  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    protected initItem(index:number,cfg:Config.AcCfg.LTRankRewardCfg,itemparam:any)
    {   

        let icons = cfg.rewardIcons;
        //
        let itemBg = BaseBitmap.create("public_9_bg23");
        itemBg.width = 624;
        itemBg.height = 90 + 120*Math.ceil(icons.length/5);
        this.addChild(itemBg);

        let titleBg = BaseBitmap.create("ladder_ranktitle_bg");
        titleBg.width = itemBg.width;
        titleBg.height = 60;
        this.addChild(titleBg);

        let line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = itemBg.width/2 - line1.width/2;
        line1.y = titleBg.y + titleBg.height/2 - line1.height/2;
        this.addChild(line1);

        let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
        let rank:number = cfg.rank[0];
        // if (rank < 4)
        // {
        //     txt.text = LanguageManager.getlocal("acRank_rank6",[App.StringUtil.changeIntToCharText(rank)]);
        // }else
        // {
            if(cfg.rank[0] < cfg.rank[1]){
                txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(cfg.rank[0]),String(cfg.rank[1])] );
            }
            else{
                txt.text =LanguageManager.getlocal("acRank_rank6", [cfg.rank[0].toString()]);
            }
        // }
        txt.x = itemBg.width/2 - txt.width/2;
        txt.y = titleBg.y + titleBg.height/2 - txt.height/2;
        this.addChild(txt);

        for (let i = 0; i<icons.length; i++)
        {
            let oneIcon = icons[i];
            oneIcon.setPosition(18+ i%5*120,80+Math.floor(i/5)*120);
            this.addChild(oneIcon);
        }
    }
}