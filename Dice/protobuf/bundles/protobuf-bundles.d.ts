type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace dice. */
declare namespace dice {

    /** Properties of a CsRayMsg. */
    interface ICsRayMsg {

        /** CsRayMsg rnum */
        rnum?: (number|null);

        /** CsRayMsg uid */
        uid?: (number|null);

        /** CsRayMsg access_token */
        access_token?: (string|null);

        /** CsRayMsg secret */
        secret?: (string|null);

        /** CsRayMsg ts */
        ts?: (number|Long|null);

        /** CsRayMsg logints */
        logints?: (number|null);

        /** CsRayMsg zoneid */
        zoneid?: (number|null);

        /** CsRayMsg params */
        params?: (Uint8Array|null);

        /** CsRayMsg cmd */
        cmd?: (string|null);
    }

    /** Represents a CsRayMsg. */
    class CsRayMsg implements ICsRayMsg {

        /**
         * Constructs a new CsRayMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.ICsRayMsg);

        /** CsRayMsg rnum. */
        public rnum: number;

        /** CsRayMsg uid. */
        public uid: number;

        /** CsRayMsg access_token. */
        public access_token: string;

        /** CsRayMsg secret. */
        public secret: string;

        /** CsRayMsg ts. */
        public ts: (number|Long);

        /** CsRayMsg logints. */
        public logints: number;

        /** CsRayMsg zoneid. */
        public zoneid: number;

        /** CsRayMsg params. */
        public params: Uint8Array;

        /** CsRayMsg cmd. */
        public cmd: string;

        /**
         * Creates a new CsRayMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CsRayMsg instance
         */
        public static create(properties?: dice.ICsRayMsg): dice.CsRayMsg;

        /**
         * Encodes the specified CsRayMsg message. Does not implicitly {@link dice.CsRayMsg.verify|verify} messages.
         * @param message CsRayMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.ICsRayMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified CsRayMsg message, length delimited. Does not implicitly {@link dice.CsRayMsg.verify|verify} messages.
         * @param message CsRayMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.ICsRayMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a CsRayMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CsRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.CsRayMsg;

        /**
         * Decodes a CsRayMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CsRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.CsRayMsg;

        /**
         * Verifies a CsRayMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a ScRayMsg. */
    interface IScRayMsg {

        /** ScRayMsg rnum */
        rnum?: (number|null);

        /** ScRayMsg uid */
        uid?: (number|Long|null);

        /** ScRayMsg access_token */
        access_token?: (string|null);

        /** ScRayMsg ts */
        ts?: (number|Long|null);

        /** ScRayMsg ret */
        ret?: (number|null);

        /** ScRayMsg msg */
        msg?: (string|null);

        /** ScRayMsg version */
        version?: (number|null);

        /** ScRayMsg model */
        model?: ({ [k: string]: Uint8Array }|null);

        /** ScRayMsg data */
        data?: (Uint8Array|null);

        /** ScRayMsg cmd */
        cmd?: (string|null);
    }

    /** Represents a ScRayMsg. */
    class ScRayMsg implements IScRayMsg {

        /**
         * Constructs a new ScRayMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.IScRayMsg);

        /** ScRayMsg rnum. */
        public rnum: number;

        /** ScRayMsg uid. */
        public uid: (number|Long);

        /** ScRayMsg access_token. */
        public access_token: string;

        /** ScRayMsg ts. */
        public ts: (number|Long);

        /** ScRayMsg ret. */
        public ret: number;

        /** ScRayMsg msg. */
        public msg: string;

        /** ScRayMsg version. */
        public version: number;

        /** ScRayMsg model. */
        public model: { [k: string]: Uint8Array };

        /** ScRayMsg data. */
        public data: Uint8Array;

        /** ScRayMsg cmd. */
        public cmd: string;

        /**
         * Creates a new ScRayMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ScRayMsg instance
         */
        public static create(properties?: dice.IScRayMsg): dice.ScRayMsg;

        /**
         * Encodes the specified ScRayMsg message. Does not implicitly {@link dice.ScRayMsg.verify|verify} messages.
         * @param message ScRayMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.IScRayMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ScRayMsg message, length delimited. Does not implicitly {@link dice.ScRayMsg.verify|verify} messages.
         * @param message ScRayMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.IScRayMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ScRayMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ScRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.ScRayMsg;

        /**
         * Decodes a ScRayMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ScRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.ScRayMsg;

        /**
         * Verifies a ScRayMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_login. */
    interface Ics_user_login {

        /** cs_user_login pid */
        pid?: (string|null);

        /** cs_user_login plat */
        plat?: (string|null);

        /** cs_user_login serverIp */
        serverIp?: (string|null);

        /** cs_user_login serverPort */
        serverPort?: (string|null);

        /** cs_user_login deviceid */
        deviceid?: (string|null);

        /** cs_user_login enter */
        enter?: (boolean|null);

        /** cs_user_login client_ip */
        client_ip?: (string|null);
    }

    /** Represents a cs_user_login. */
    class cs_user_login implements Ics_user_login {

        /**
         * Constructs a new cs_user_login.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_login);

        /** cs_user_login pid. */
        public pid: string;

        /** cs_user_login plat. */
        public plat: string;

        /** cs_user_login serverIp. */
        public serverIp: string;

        /** cs_user_login serverPort. */
        public serverPort: string;

        /** cs_user_login deviceid. */
        public deviceid: string;

        /** cs_user_login enter. */
        public enter: boolean;

        /** cs_user_login client_ip. */
        public client_ip: string;

        /**
         * Creates a new cs_user_login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_login instance
         */
        public static create(properties?: dice.Ics_user_login): dice.cs_user_login;

        /**
         * Encodes the specified cs_user_login message. Does not implicitly {@link dice.cs_user_login.verify|verify} messages.
         * @param message cs_user_login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_login message, length delimited. Does not implicitly {@link dice.cs_user_login.verify|verify} messages.
         * @param message cs_user_login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_login;

        /**
         * Decodes a cs_user_login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_login;

        /**
         * Verifies a cs_user_login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_login. */
    interface Isc_user_login {

        /** sc_user_login timezone */
        timezone?: (number|null);

        /** sc_user_login initRedpoint */
        initRedpoint?: ({ [k: string]: number }|null);

        /** sc_user_login moneyType */
        moneyType?: (string|null);

        /** sc_user_login orderCfg */
        orderCfg?: ({ [k: string]: string }|null);

        /** sc_user_login regdt */
        regdt?: (number|null);

        /** sc_user_login switch */
        "switch"?: ({ [k: string]: number }|null);

        /** sc_user_login newerFlag */
        newerFlag?: (number|null);
    }

    /** Represents a sc_user_login. */
    class sc_user_login implements Isc_user_login {

        /**
         * Constructs a new sc_user_login.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_login);

        /** sc_user_login timezone. */
        public timezone: number;

        /** sc_user_login initRedpoint. */
        public initRedpoint: { [k: string]: number };

        /** sc_user_login moneyType. */
        public moneyType: string;

        /** sc_user_login orderCfg. */
        public orderCfg: { [k: string]: string };

        /** sc_user_login regdt. */
        public regdt: number;

        /** sc_user_login switch. */
        public switch: { [k: string]: number };

        /** sc_user_login newerFlag. */
        public newerFlag: number;

        /**
         * Creates a new sc_user_login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_login instance
         */
        public static create(properties?: dice.Isc_user_login): dice.sc_user_login;

        /**
         * Encodes the specified sc_user_login message. Does not implicitly {@link dice.sc_user_login.verify|verify} messages.
         * @param message sc_user_login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_login message, length delimited. Does not implicitly {@link dice.sc_user_login.verify|verify} messages.
         * @param message sc_user_login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_login;

        /**
         * Decodes a sc_user_login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_login;

        /**
         * Verifies a sc_user_login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_createName. */
    interface Ics_user_createName {

        /** cs_user_createName name */
        name?: (string|null);
    }

    /** Represents a cs_user_createName. */
    class cs_user_createName implements Ics_user_createName {

        /**
         * Constructs a new cs_user_createName.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_createName);

        /** cs_user_createName name. */
        public name: string;

        /**
         * Creates a new cs_user_createName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_createName instance
         */
        public static create(properties?: dice.Ics_user_createName): dice.cs_user_createName;

        /**
         * Encodes the specified cs_user_createName message. Does not implicitly {@link dice.cs_user_createName.verify|verify} messages.
         * @param message cs_user_createName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_createName, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_createName message, length delimited. Does not implicitly {@link dice.cs_user_createName.verify|verify} messages.
         * @param message cs_user_createName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_createName, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_createName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_createName;

        /**
         * Decodes a cs_user_createName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_createName;

        /**
         * Verifies a cs_user_createName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_createName. */
    interface Isc_user_createName {

        /** sc_user_createName nameFlag */
        nameFlag?: (number|null);
    }

    /** Represents a sc_user_createName. */
    class sc_user_createName implements Isc_user_createName {

        /**
         * Constructs a new sc_user_createName.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_createName);

        /** sc_user_createName nameFlag. */
        public nameFlag: number;

        /**
         * Creates a new sc_user_createName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_createName instance
         */
        public static create(properties?: dice.Isc_user_createName): dice.sc_user_createName;

        /**
         * Encodes the specified sc_user_createName message. Does not implicitly {@link dice.sc_user_createName.verify|verify} messages.
         * @param message sc_user_createName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_createName, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_createName message, length delimited. Does not implicitly {@link dice.sc_user_createName.verify|verify} messages.
         * @param message sc_user_createName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_createName, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_createName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_createName;

        /**
         * Decodes a sc_user_createName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_createName;

        /**
         * Verifies a sc_user_createName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_rename. */
    interface Ics_user_rename {

        /** cs_user_rename name */
        name?: (string|null);
    }

    /** Represents a cs_user_rename. */
    class cs_user_rename implements Ics_user_rename {

        /**
         * Constructs a new cs_user_rename.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_rename);

        /** cs_user_rename name. */
        public name: string;

        /**
         * Creates a new cs_user_rename instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_rename instance
         */
        public static create(properties?: dice.Ics_user_rename): dice.cs_user_rename;

        /**
         * Encodes the specified cs_user_rename message. Does not implicitly {@link dice.cs_user_rename.verify|verify} messages.
         * @param message cs_user_rename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_rename, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_rename message, length delimited. Does not implicitly {@link dice.cs_user_rename.verify|verify} messages.
         * @param message cs_user_rename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_rename, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_rename message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_rename;

        /**
         * Decodes a cs_user_rename message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_rename;

        /**
         * Verifies a cs_user_rename message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_rename. */
    interface Isc_user_rename {

        /** sc_user_rename nameFlag */
        nameFlag?: (number|null);
    }

    /** Represents a sc_user_rename. */
    class sc_user_rename implements Isc_user_rename {

        /**
         * Constructs a new sc_user_rename.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_rename);

        /** sc_user_rename nameFlag. */
        public nameFlag: number;

        /**
         * Creates a new sc_user_rename instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_rename instance
         */
        public static create(properties?: dice.Isc_user_rename): dice.sc_user_rename;

        /**
         * Encodes the specified sc_user_rename message. Does not implicitly {@link dice.sc_user_rename.verify|verify} messages.
         * @param message sc_user_rename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_rename, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_rename message, length delimited. Does not implicitly {@link dice.sc_user_rename.verify|verify} messages.
         * @param message sc_user_rename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_rename, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_rename message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_rename;

        /**
         * Decodes a sc_user_rename message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_rename;

        /**
         * Verifies a sc_user_rename message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_resetwin. */
    interface Ics_user_resetwin {
    }

    /** Represents a cs_user_resetwin. */
    class cs_user_resetwin implements Ics_user_resetwin {

        /**
         * Constructs a new cs_user_resetwin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_resetwin);

        /**
         * Creates a new cs_user_resetwin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_resetwin instance
         */
        public static create(properties?: dice.Ics_user_resetwin): dice.cs_user_resetwin;

        /**
         * Encodes the specified cs_user_resetwin message. Does not implicitly {@link dice.cs_user_resetwin.verify|verify} messages.
         * @param message cs_user_resetwin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_resetwin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_resetwin message, length delimited. Does not implicitly {@link dice.cs_user_resetwin.verify|verify} messages.
         * @param message cs_user_resetwin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_resetwin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_resetwin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_resetwin;

        /**
         * Decodes a cs_user_resetwin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_resetwin;

        /**
         * Verifies a cs_user_resetwin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_resetwin. */
    interface Isc_user_resetwin {
    }

    /** Represents a sc_user_resetwin. */
    class sc_user_resetwin implements Isc_user_resetwin {

        /**
         * Constructs a new sc_user_resetwin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_resetwin);

        /**
         * Creates a new sc_user_resetwin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_resetwin instance
         */
        public static create(properties?: dice.Isc_user_resetwin): dice.sc_user_resetwin;

        /**
         * Encodes the specified sc_user_resetwin message. Does not implicitly {@link dice.sc_user_resetwin.verify|verify} messages.
         * @param message sc_user_resetwin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_resetwin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_resetwin message, length delimited. Does not implicitly {@link dice.sc_user_resetwin.verify|verify} messages.
         * @param message sc_user_resetwin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_resetwin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_resetwin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_resetwin;

        /**
         * Decodes a sc_user_resetwin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_resetwin;

        /**
         * Verifies a sc_user_resetwin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_resetjnum. */
    interface Ics_user_resetjnum {
    }

    /** Represents a cs_user_resetjnum. */
    class cs_user_resetjnum implements Ics_user_resetjnum {

        /**
         * Constructs a new cs_user_resetjnum.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_resetjnum);

        /**
         * Creates a new cs_user_resetjnum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_resetjnum instance
         */
        public static create(properties?: dice.Ics_user_resetjnum): dice.cs_user_resetjnum;

        /**
         * Encodes the specified cs_user_resetjnum message. Does not implicitly {@link dice.cs_user_resetjnum.verify|verify} messages.
         * @param message cs_user_resetjnum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_resetjnum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_resetjnum message, length delimited. Does not implicitly {@link dice.cs_user_resetjnum.verify|verify} messages.
         * @param message cs_user_resetjnum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_resetjnum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_resetjnum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_resetjnum;

        /**
         * Decodes a cs_user_resetjnum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_resetjnum;

        /**
         * Verifies a cs_user_resetjnum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_resetjnum. */
    interface Isc_user_resetjnum {
    }

    /** Represents a sc_user_resetjnum. */
    class sc_user_resetjnum implements Isc_user_resetjnum {

        /**
         * Constructs a new sc_user_resetjnum.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_resetjnum);

        /**
         * Creates a new sc_user_resetjnum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_resetjnum instance
         */
        public static create(properties?: dice.Isc_user_resetjnum): dice.sc_user_resetjnum;

        /**
         * Encodes the specified sc_user_resetjnum message. Does not implicitly {@link dice.sc_user_resetjnum.verify|verify} messages.
         * @param message sc_user_resetjnum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_resetjnum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_resetjnum message, length delimited. Does not implicitly {@link dice.sc_user_resetjnum.verify|verify} messages.
         * @param message sc_user_resetjnum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_resetjnum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_resetjnum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_resetjnum;

        /**
         * Decodes a sc_user_resetjnum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_resetjnum;

        /**
         * Verifies a sc_user_resetjnum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_openCardBox. */
    interface Ics_user_openCardBox {
    }

    /** Represents a cs_user_openCardBox. */
    class cs_user_openCardBox implements Ics_user_openCardBox {

        /**
         * Constructs a new cs_user_openCardBox.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_openCardBox);

        /**
         * Creates a new cs_user_openCardBox instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_openCardBox instance
         */
        public static create(properties?: dice.Ics_user_openCardBox): dice.cs_user_openCardBox;

        /**
         * Encodes the specified cs_user_openCardBox message. Does not implicitly {@link dice.cs_user_openCardBox.verify|verify} messages.
         * @param message cs_user_openCardBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_openCardBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_openCardBox message, length delimited. Does not implicitly {@link dice.cs_user_openCardBox.verify|verify} messages.
         * @param message cs_user_openCardBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_openCardBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_openCardBox message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_openCardBox;

        /**
         * Decodes a cs_user_openCardBox message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_openCardBox;

        /**
         * Verifies a cs_user_openCardBox message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_openCardBox. */
    interface Isc_user_openCardBox {

        /** sc_user_openCardBox rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_user_openCardBox. */
    class sc_user_openCardBox implements Isc_user_openCardBox {

        /**
         * Constructs a new sc_user_openCardBox.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_openCardBox);

        /** sc_user_openCardBox rewards. */
        public rewards: string;

        /**
         * Creates a new sc_user_openCardBox instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_openCardBox instance
         */
        public static create(properties?: dice.Isc_user_openCardBox): dice.sc_user_openCardBox;

        /**
         * Encodes the specified sc_user_openCardBox message. Does not implicitly {@link dice.sc_user_openCardBox.verify|verify} messages.
         * @param message sc_user_openCardBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_openCardBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_openCardBox message, length delimited. Does not implicitly {@link dice.sc_user_openCardBox.verify|verify} messages.
         * @param message sc_user_openCardBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_openCardBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_openCardBox message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_openCardBox;

        /**
         * Decodes a sc_user_openCardBox message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_openCardBox;

        /**
         * Verifies a sc_user_openCardBox message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_getRoyalPass. */
    interface Ics_user_getRoyalPass {

        /** cs_user_getRoyalPass isAdvanced */
        isAdvanced?: (number|null);

        /** cs_user_getRoyalPass key */
        key?: (string|null);
    }

    /** Represents a cs_user_getRoyalPass. */
    class cs_user_getRoyalPass implements Ics_user_getRoyalPass {

        /**
         * Constructs a new cs_user_getRoyalPass.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_getRoyalPass);

        /** cs_user_getRoyalPass isAdvanced. */
        public isAdvanced: number;

        /** cs_user_getRoyalPass key. */
        public key: string;

        /**
         * Creates a new cs_user_getRoyalPass instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_getRoyalPass instance
         */
        public static create(properties?: dice.Ics_user_getRoyalPass): dice.cs_user_getRoyalPass;

        /**
         * Encodes the specified cs_user_getRoyalPass message. Does not implicitly {@link dice.cs_user_getRoyalPass.verify|verify} messages.
         * @param message cs_user_getRoyalPass message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_getRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_getRoyalPass message, length delimited. Does not implicitly {@link dice.cs_user_getRoyalPass.verify|verify} messages.
         * @param message cs_user_getRoyalPass message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_getRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_getRoyalPass message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_getRoyalPass;

        /**
         * Decodes a cs_user_getRoyalPass message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_getRoyalPass;

        /**
         * Verifies a cs_user_getRoyalPass message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_getRoyalPass. */
    interface Isc_user_getRoyalPass {

        /** sc_user_getRoyalPass rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_user_getRoyalPass. */
    class sc_user_getRoyalPass implements Isc_user_getRoyalPass {

        /**
         * Constructs a new sc_user_getRoyalPass.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_getRoyalPass);

        /** sc_user_getRoyalPass rewards. */
        public rewards: string;

        /**
         * Creates a new sc_user_getRoyalPass instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_getRoyalPass instance
         */
        public static create(properties?: dice.Isc_user_getRoyalPass): dice.sc_user_getRoyalPass;

        /**
         * Encodes the specified sc_user_getRoyalPass message. Does not implicitly {@link dice.sc_user_getRoyalPass.verify|verify} messages.
         * @param message sc_user_getRoyalPass message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_getRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_getRoyalPass message, length delimited. Does not implicitly {@link dice.sc_user_getRoyalPass.verify|verify} messages.
         * @param message sc_user_getRoyalPass message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_getRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_getRoyalPass message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_getRoyalPass;

        /**
         * Decodes a sc_user_getRoyalPass message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_getRoyalPass;

        /**
         * Verifies a sc_user_getRoyalPass message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_freshDayInfo. */
    interface Ics_user_freshDayInfo {
    }

    /** Represents a cs_user_freshDayInfo. */
    class cs_user_freshDayInfo implements Ics_user_freshDayInfo {

        /**
         * Constructs a new cs_user_freshDayInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_freshDayInfo);

        /**
         * Creates a new cs_user_freshDayInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_freshDayInfo instance
         */
        public static create(properties?: dice.Ics_user_freshDayInfo): dice.cs_user_freshDayInfo;

        /**
         * Encodes the specified cs_user_freshDayInfo message. Does not implicitly {@link dice.cs_user_freshDayInfo.verify|verify} messages.
         * @param message cs_user_freshDayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_freshDayInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_freshDayInfo message, length delimited. Does not implicitly {@link dice.cs_user_freshDayInfo.verify|verify} messages.
         * @param message cs_user_freshDayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_freshDayInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_freshDayInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_freshDayInfo;

        /**
         * Decodes a cs_user_freshDayInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_freshDayInfo;

        /**
         * Verifies a cs_user_freshDayInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_freshDayInfo. */
    interface Isc_user_freshDayInfo {
    }

    /** Represents a sc_user_freshDayInfo. */
    class sc_user_freshDayInfo implements Isc_user_freshDayInfo {

        /**
         * Constructs a new sc_user_freshDayInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_freshDayInfo);

        /**
         * Creates a new sc_user_freshDayInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_freshDayInfo instance
         */
        public static create(properties?: dice.Isc_user_freshDayInfo): dice.sc_user_freshDayInfo;

        /**
         * Encodes the specified sc_user_freshDayInfo message. Does not implicitly {@link dice.sc_user_freshDayInfo.verify|verify} messages.
         * @param message sc_user_freshDayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_freshDayInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_freshDayInfo message, length delimited. Does not implicitly {@link dice.sc_user_freshDayInfo.verify|verify} messages.
         * @param message sc_user_freshDayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_freshDayInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_freshDayInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_freshDayInfo;

        /**
         * Decodes a sc_user_freshDayInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_freshDayInfo;

        /**
         * Verifies a sc_user_freshDayInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_newerGuild. */
    interface Ics_user_newerGuild {

        /** cs_user_newerGuild step */
        step?: (number|null);
    }

    /** Represents a cs_user_newerGuild. */
    class cs_user_newerGuild implements Ics_user_newerGuild {

        /**
         * Constructs a new cs_user_newerGuild.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_newerGuild);

        /** cs_user_newerGuild step. */
        public step: number;

        /**
         * Creates a new cs_user_newerGuild instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_newerGuild instance
         */
        public static create(properties?: dice.Ics_user_newerGuild): dice.cs_user_newerGuild;

        /**
         * Encodes the specified cs_user_newerGuild message. Does not implicitly {@link dice.cs_user_newerGuild.verify|verify} messages.
         * @param message cs_user_newerGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_newerGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_newerGuild message, length delimited. Does not implicitly {@link dice.cs_user_newerGuild.verify|verify} messages.
         * @param message cs_user_newerGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_newerGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_newerGuild message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_newerGuild;

        /**
         * Decodes a cs_user_newerGuild message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_newerGuild;

        /**
         * Verifies a cs_user_newerGuild message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_newerGuild. */
    interface Isc_user_newerGuild {
    }

    /** Represents a sc_user_newerGuild. */
    class sc_user_newerGuild implements Isc_user_newerGuild {

        /**
         * Constructs a new sc_user_newerGuild.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_newerGuild);

        /**
         * Creates a new sc_user_newerGuild instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_newerGuild instance
         */
        public static create(properties?: dice.Isc_user_newerGuild): dice.sc_user_newerGuild;

        /**
         * Encodes the specified sc_user_newerGuild message. Does not implicitly {@link dice.sc_user_newerGuild.verify|verify} messages.
         * @param message sc_user_newerGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_newerGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_newerGuild message, length delimited. Does not implicitly {@link dice.sc_user_newerGuild.verify|verify} messages.
         * @param message sc_user_newerGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_newerGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_newerGuild message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_newerGuild;

        /**
         * Decodes a sc_user_newerGuild message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_newerGuild;

        /**
         * Verifies a sc_user_newerGuild message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_stepGuild. */
    interface Ics_user_stepGuild {

        /** cs_user_stepGuild stepId */
        stepId?: (string|null);
    }

    /** Represents a cs_user_stepGuild. */
    class cs_user_stepGuild implements Ics_user_stepGuild {

        /**
         * Constructs a new cs_user_stepGuild.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_stepGuild);

        /** cs_user_stepGuild stepId. */
        public stepId: string;

        /**
         * Creates a new cs_user_stepGuild instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_stepGuild instance
         */
        public static create(properties?: dice.Ics_user_stepGuild): dice.cs_user_stepGuild;

        /**
         * Encodes the specified cs_user_stepGuild message. Does not implicitly {@link dice.cs_user_stepGuild.verify|verify} messages.
         * @param message cs_user_stepGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_stepGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_stepGuild message, length delimited. Does not implicitly {@link dice.cs_user_stepGuild.verify|verify} messages.
         * @param message cs_user_stepGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_stepGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_stepGuild message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_stepGuild;

        /**
         * Decodes a cs_user_stepGuild message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_stepGuild;

        /**
         * Verifies a cs_user_stepGuild message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_stepGuild. */
    interface Isc_user_stepGuild {
    }

    /** Represents a sc_user_stepGuild. */
    class sc_user_stepGuild implements Isc_user_stepGuild {

        /**
         * Constructs a new sc_user_stepGuild.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_stepGuild);

        /**
         * Creates a new sc_user_stepGuild instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_stepGuild instance
         */
        public static create(properties?: dice.Isc_user_stepGuild): dice.sc_user_stepGuild;

        /**
         * Encodes the specified sc_user_stepGuild message. Does not implicitly {@link dice.sc_user_stepGuild.verify|verify} messages.
         * @param message sc_user_stepGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_stepGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_stepGuild message, length delimited. Does not implicitly {@link dice.sc_user_stepGuild.verify|verify} messages.
         * @param message sc_user_stepGuild message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_stepGuild, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_stepGuild message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_stepGuild;

        /**
         * Decodes a sc_user_stepGuild message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_stepGuild;

        /**
         * Verifies a sc_user_stepGuild message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_user_sync. */
    interface Ics_user_sync {
    }

    /** Represents a cs_user_sync. */
    class cs_user_sync implements Ics_user_sync {

        /**
         * Constructs a new cs_user_sync.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_user_sync);

        /**
         * Creates a new cs_user_sync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_user_sync instance
         */
        public static create(properties?: dice.Ics_user_sync): dice.cs_user_sync;

        /**
         * Encodes the specified cs_user_sync message. Does not implicitly {@link dice.cs_user_sync.verify|verify} messages.
         * @param message cs_user_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_user_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_user_sync message, length delimited. Does not implicitly {@link dice.cs_user_sync.verify|verify} messages.
         * @param message cs_user_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_user_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_user_sync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_user_sync;

        /**
         * Decodes a cs_user_sync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_user_sync;

        /**
         * Verifies a cs_user_sync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_user_sync. */
    interface Isc_user_sync {
    }

    /** Represents a sc_user_sync. */
    class sc_user_sync implements Isc_user_sync {

        /**
         * Constructs a new sc_user_sync.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_user_sync);

        /**
         * Creates a new sc_user_sync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_user_sync instance
         */
        public static create(properties?: dice.Isc_user_sync): dice.sc_user_sync;

        /**
         * Encodes the specified sc_user_sync message. Does not implicitly {@link dice.sc_user_sync.verify|verify} messages.
         * @param message sc_user_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_user_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_user_sync message, length delimited. Does not implicitly {@link dice.sc_user_sync.verify|verify} messages.
         * @param message sc_user_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_user_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_user_sync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_user_sync;

        /**
         * Decodes a sc_user_sync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_user_sync;

        /**
         * Verifies a sc_user_sync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_task_fresh. */
    interface Ics_task_fresh {

        /** cs_task_fresh keyPos */
        keyPos?: (number|null);
    }

    /** Represents a cs_task_fresh. */
    class cs_task_fresh implements Ics_task_fresh {

        /**
         * Constructs a new cs_task_fresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_task_fresh);

        /** cs_task_fresh keyPos. */
        public keyPos: number;

        /**
         * Creates a new cs_task_fresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_task_fresh instance
         */
        public static create(properties?: dice.Ics_task_fresh): dice.cs_task_fresh;

        /**
         * Encodes the specified cs_task_fresh message. Does not implicitly {@link dice.cs_task_fresh.verify|verify} messages.
         * @param message cs_task_fresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_task_fresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_task_fresh message, length delimited. Does not implicitly {@link dice.cs_task_fresh.verify|verify} messages.
         * @param message cs_task_fresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_task_fresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_task_fresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_task_fresh;

        /**
         * Decodes a cs_task_fresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_task_fresh;

        /**
         * Verifies a cs_task_fresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_task_fresh. */
    interface Isc_task_fresh {
    }

    /** Represents a sc_task_fresh. */
    class sc_task_fresh implements Isc_task_fresh {

        /**
         * Constructs a new sc_task_fresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_task_fresh);

        /**
         * Creates a new sc_task_fresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_task_fresh instance
         */
        public static create(properties?: dice.Isc_task_fresh): dice.sc_task_fresh;

        /**
         * Encodes the specified sc_task_fresh message. Does not implicitly {@link dice.sc_task_fresh.verify|verify} messages.
         * @param message sc_task_fresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_task_fresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_task_fresh message, length delimited. Does not implicitly {@link dice.sc_task_fresh.verify|verify} messages.
         * @param message sc_task_fresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_task_fresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_task_fresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_task_fresh;

        /**
         * Decodes a sc_task_fresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_task_fresh;

        /**
         * Verifies a sc_task_fresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_task_getDayRewards. */
    interface Ics_task_getDayRewards {

        /** cs_task_getDayRewards keyPos */
        keyPos?: (number|null);
    }

    /** Represents a cs_task_getDayRewards. */
    class cs_task_getDayRewards implements Ics_task_getDayRewards {

        /**
         * Constructs a new cs_task_getDayRewards.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_task_getDayRewards);

        /** cs_task_getDayRewards keyPos. */
        public keyPos: number;

        /**
         * Creates a new cs_task_getDayRewards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_task_getDayRewards instance
         */
        public static create(properties?: dice.Ics_task_getDayRewards): dice.cs_task_getDayRewards;

        /**
         * Encodes the specified cs_task_getDayRewards message. Does not implicitly {@link dice.cs_task_getDayRewards.verify|verify} messages.
         * @param message cs_task_getDayRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_task_getDayRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_task_getDayRewards message, length delimited. Does not implicitly {@link dice.cs_task_getDayRewards.verify|verify} messages.
         * @param message cs_task_getDayRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_task_getDayRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_task_getDayRewards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_task_getDayRewards;

        /**
         * Decodes a cs_task_getDayRewards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_task_getDayRewards;

        /**
         * Verifies a cs_task_getDayRewards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_task_getDayRewards. */
    interface Isc_task_getDayRewards {

        /** sc_task_getDayRewards rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_task_getDayRewards. */
    class sc_task_getDayRewards implements Isc_task_getDayRewards {

        /**
         * Constructs a new sc_task_getDayRewards.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_task_getDayRewards);

        /** sc_task_getDayRewards rewards. */
        public rewards: string;

        /**
         * Creates a new sc_task_getDayRewards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_task_getDayRewards instance
         */
        public static create(properties?: dice.Isc_task_getDayRewards): dice.sc_task_getDayRewards;

        /**
         * Encodes the specified sc_task_getDayRewards message. Does not implicitly {@link dice.sc_task_getDayRewards.verify|verify} messages.
         * @param message sc_task_getDayRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_task_getDayRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_task_getDayRewards message, length delimited. Does not implicitly {@link dice.sc_task_getDayRewards.verify|verify} messages.
         * @param message sc_task_getDayRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_task_getDayRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_task_getDayRewards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_task_getDayRewards;

        /**
         * Decodes a sc_task_getDayRewards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_task_getDayRewards;

        /**
         * Verifies a sc_task_getDayRewards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_task_getRewards. */
    interface Ics_task_getRewards {

        /** cs_task_getRewards taskId */
        taskId?: (string|null);
    }

    /** Represents a cs_task_getRewards. */
    class cs_task_getRewards implements Ics_task_getRewards {

        /**
         * Constructs a new cs_task_getRewards.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_task_getRewards);

        /** cs_task_getRewards taskId. */
        public taskId: string;

        /**
         * Creates a new cs_task_getRewards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_task_getRewards instance
         */
        public static create(properties?: dice.Ics_task_getRewards): dice.cs_task_getRewards;

        /**
         * Encodes the specified cs_task_getRewards message. Does not implicitly {@link dice.cs_task_getRewards.verify|verify} messages.
         * @param message cs_task_getRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_task_getRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_task_getRewards message, length delimited. Does not implicitly {@link dice.cs_task_getRewards.verify|verify} messages.
         * @param message cs_task_getRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_task_getRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_task_getRewards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_task_getRewards;

        /**
         * Decodes a cs_task_getRewards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_task_getRewards;

        /**
         * Verifies a cs_task_getRewards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_task_getRewards. */
    interface Isc_task_getRewards {

        /** sc_task_getRewards rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_task_getRewards. */
    class sc_task_getRewards implements Isc_task_getRewards {

        /**
         * Constructs a new sc_task_getRewards.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_task_getRewards);

        /** sc_task_getRewards rewards. */
        public rewards: string;

        /**
         * Creates a new sc_task_getRewards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_task_getRewards instance
         */
        public static create(properties?: dice.Isc_task_getRewards): dice.sc_task_getRewards;

        /**
         * Encodes the specified sc_task_getRewards message. Does not implicitly {@link dice.sc_task_getRewards.verify|verify} messages.
         * @param message sc_task_getRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_task_getRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_task_getRewards message, length delimited. Does not implicitly {@link dice.sc_task_getRewards.verify|verify} messages.
         * @param message sc_task_getRewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_task_getRewards, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_task_getRewards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_task_getRewards;

        /**
         * Decodes a sc_task_getRewards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_task_getRewards;

        /**
         * Verifies a sc_task_getRewards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_task_getAchievement. */
    interface Ics_task_getAchievement {

        /** cs_task_getAchievement rkey */
        rkey?: (string|null);
    }

    /** Represents a cs_task_getAchievement. */
    class cs_task_getAchievement implements Ics_task_getAchievement {

        /**
         * Constructs a new cs_task_getAchievement.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_task_getAchievement);

        /** cs_task_getAchievement rkey. */
        public rkey: string;

        /**
         * Creates a new cs_task_getAchievement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_task_getAchievement instance
         */
        public static create(properties?: dice.Ics_task_getAchievement): dice.cs_task_getAchievement;

        /**
         * Encodes the specified cs_task_getAchievement message. Does not implicitly {@link dice.cs_task_getAchievement.verify|verify} messages.
         * @param message cs_task_getAchievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_task_getAchievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_task_getAchievement message, length delimited. Does not implicitly {@link dice.cs_task_getAchievement.verify|verify} messages.
         * @param message cs_task_getAchievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_task_getAchievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_task_getAchievement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_task_getAchievement;

        /**
         * Decodes a cs_task_getAchievement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_task_getAchievement;

        /**
         * Verifies a cs_task_getAchievement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_task_getAchievement. */
    interface Isc_task_getAchievement {

        /** sc_task_getAchievement rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_task_getAchievement. */
    class sc_task_getAchievement implements Isc_task_getAchievement {

        /**
         * Constructs a new sc_task_getAchievement.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_task_getAchievement);

        /** sc_task_getAchievement rewards. */
        public rewards: string;

        /**
         * Creates a new sc_task_getAchievement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_task_getAchievement instance
         */
        public static create(properties?: dice.Isc_task_getAchievement): dice.sc_task_getAchievement;

        /**
         * Encodes the specified sc_task_getAchievement message. Does not implicitly {@link dice.sc_task_getAchievement.verify|verify} messages.
         * @param message sc_task_getAchievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_task_getAchievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_task_getAchievement message, length delimited. Does not implicitly {@link dice.sc_task_getAchievement.verify|verify} messages.
         * @param message sc_task_getAchievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_task_getAchievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_task_getAchievement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_task_getAchievement;

        /**
         * Decodes a sc_task_getAchievement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_task_getAchievement;

        /**
         * Verifies a sc_task_getAchievement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_shop_buyBox. */
    interface Ics_shop_buyBox {

        /** cs_shop_buyBox shopId */
        shopId?: (string|null);

        /** cs_shop_buyBox idDiscout */
        idDiscout?: (number|null);
    }

    /** Represents a cs_shop_buyBox. */
    class cs_shop_buyBox implements Ics_shop_buyBox {

        /**
         * Constructs a new cs_shop_buyBox.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_shop_buyBox);

        /** cs_shop_buyBox shopId. */
        public shopId: string;

        /** cs_shop_buyBox idDiscout. */
        public idDiscout: number;

        /**
         * Creates a new cs_shop_buyBox instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_shop_buyBox instance
         */
        public static create(properties?: dice.Ics_shop_buyBox): dice.cs_shop_buyBox;

        /**
         * Encodes the specified cs_shop_buyBox message. Does not implicitly {@link dice.cs_shop_buyBox.verify|verify} messages.
         * @param message cs_shop_buyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_shop_buyBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_shop_buyBox message, length delimited. Does not implicitly {@link dice.cs_shop_buyBox.verify|verify} messages.
         * @param message cs_shop_buyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_shop_buyBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_shop_buyBox message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_shop_buyBox;

        /**
         * Decodes a cs_shop_buyBox message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_shop_buyBox;

        /**
         * Verifies a cs_shop_buyBox message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_shop_buyBox. */
    interface Isc_shop_buyBox {

        /** sc_shop_buyBox rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_shop_buyBox. */
    class sc_shop_buyBox implements Isc_shop_buyBox {

        /**
         * Constructs a new sc_shop_buyBox.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_shop_buyBox);

        /** sc_shop_buyBox rewards. */
        public rewards: string;

        /**
         * Creates a new sc_shop_buyBox instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_shop_buyBox instance
         */
        public static create(properties?: dice.Isc_shop_buyBox): dice.sc_shop_buyBox;

        /**
         * Encodes the specified sc_shop_buyBox message. Does not implicitly {@link dice.sc_shop_buyBox.verify|verify} messages.
         * @param message sc_shop_buyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_shop_buyBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_shop_buyBox message, length delimited. Does not implicitly {@link dice.sc_shop_buyBox.verify|verify} messages.
         * @param message sc_shop_buyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_shop_buyBox, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_shop_buyBox message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_shop_buyBox;

        /**
         * Decodes a sc_shop_buyBox message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_shop_buyBox;

        /**
         * Verifies a sc_shop_buyBox message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_shop_buyDailyshop. */
    interface Ics_shop_buyDailyshop {

        /** cs_shop_buyDailyshop shopId */
        shopId?: (string|null);
    }

    /** Represents a cs_shop_buyDailyshop. */
    class cs_shop_buyDailyshop implements Ics_shop_buyDailyshop {

        /**
         * Constructs a new cs_shop_buyDailyshop.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_shop_buyDailyshop);

        /** cs_shop_buyDailyshop shopId. */
        public shopId: string;

        /**
         * Creates a new cs_shop_buyDailyshop instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_shop_buyDailyshop instance
         */
        public static create(properties?: dice.Ics_shop_buyDailyshop): dice.cs_shop_buyDailyshop;

        /**
         * Encodes the specified cs_shop_buyDailyshop message. Does not implicitly {@link dice.cs_shop_buyDailyshop.verify|verify} messages.
         * @param message cs_shop_buyDailyshop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_shop_buyDailyshop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_shop_buyDailyshop message, length delimited. Does not implicitly {@link dice.cs_shop_buyDailyshop.verify|verify} messages.
         * @param message cs_shop_buyDailyshop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_shop_buyDailyshop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_shop_buyDailyshop message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_shop_buyDailyshop;

        /**
         * Decodes a cs_shop_buyDailyshop message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_shop_buyDailyshop;

        /**
         * Verifies a cs_shop_buyDailyshop message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_shop_buyDailyshop. */
    interface Isc_shop_buyDailyshop {

        /** sc_shop_buyDailyshop rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_shop_buyDailyshop. */
    class sc_shop_buyDailyshop implements Isc_shop_buyDailyshop {

        /**
         * Constructs a new sc_shop_buyDailyshop.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_shop_buyDailyshop);

        /** sc_shop_buyDailyshop rewards. */
        public rewards: string;

        /**
         * Creates a new sc_shop_buyDailyshop instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_shop_buyDailyshop instance
         */
        public static create(properties?: dice.Isc_shop_buyDailyshop): dice.sc_shop_buyDailyshop;

        /**
         * Encodes the specified sc_shop_buyDailyshop message. Does not implicitly {@link dice.sc_shop_buyDailyshop.verify|verify} messages.
         * @param message sc_shop_buyDailyshop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_shop_buyDailyshop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_shop_buyDailyshop message, length delimited. Does not implicitly {@link dice.sc_shop_buyDailyshop.verify|verify} messages.
         * @param message sc_shop_buyDailyshop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_shop_buyDailyshop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_shop_buyDailyshop message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_shop_buyDailyshop;

        /**
         * Decodes a sc_shop_buyDailyshop message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_shop_buyDailyshop;

        /**
         * Verifies a sc_shop_buyDailyshop message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_shop_buyGold. */
    interface Ics_shop_buyGold {

        /** cs_shop_buyGold shopId */
        shopId?: (string|null);
    }

    /** Represents a cs_shop_buyGold. */
    class cs_shop_buyGold implements Ics_shop_buyGold {

        /**
         * Constructs a new cs_shop_buyGold.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_shop_buyGold);

        /** cs_shop_buyGold shopId. */
        public shopId: string;

        /**
         * Creates a new cs_shop_buyGold instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_shop_buyGold instance
         */
        public static create(properties?: dice.Ics_shop_buyGold): dice.cs_shop_buyGold;

        /**
         * Encodes the specified cs_shop_buyGold message. Does not implicitly {@link dice.cs_shop_buyGold.verify|verify} messages.
         * @param message cs_shop_buyGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_shop_buyGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_shop_buyGold message, length delimited. Does not implicitly {@link dice.cs_shop_buyGold.verify|verify} messages.
         * @param message cs_shop_buyGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_shop_buyGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_shop_buyGold message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_shop_buyGold;

        /**
         * Decodes a cs_shop_buyGold message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_shop_buyGold;

        /**
         * Verifies a cs_shop_buyGold message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_shop_buyGold. */
    interface Isc_shop_buyGold {
    }

    /** Represents a sc_shop_buyGold. */
    class sc_shop_buyGold implements Isc_shop_buyGold {

        /**
         * Constructs a new sc_shop_buyGold.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_shop_buyGold);

        /**
         * Creates a new sc_shop_buyGold instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_shop_buyGold instance
         */
        public static create(properties?: dice.Isc_shop_buyGold): dice.sc_shop_buyGold;

        /**
         * Encodes the specified sc_shop_buyGold message. Does not implicitly {@link dice.sc_shop_buyGold.verify|verify} messages.
         * @param message sc_shop_buyGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_shop_buyGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_shop_buyGold message, length delimited. Does not implicitly {@link dice.sc_shop_buyGold.verify|verify} messages.
         * @param message sc_shop_buyGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_shop_buyGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_shop_buyGold message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_shop_buyGold;

        /**
         * Decodes a sc_shop_buyGold message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_shop_buyGold;

        /**
         * Verifies a sc_shop_buyGold message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_shop_buyEmoticon. */
    interface Ics_shop_buyEmoticon {

        /** cs_shop_buyEmoticon shopId */
        shopId?: (string|null);
    }

    /** Represents a cs_shop_buyEmoticon. */
    class cs_shop_buyEmoticon implements Ics_shop_buyEmoticon {

        /**
         * Constructs a new cs_shop_buyEmoticon.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_shop_buyEmoticon);

        /** cs_shop_buyEmoticon shopId. */
        public shopId: string;

        /**
         * Creates a new cs_shop_buyEmoticon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_shop_buyEmoticon instance
         */
        public static create(properties?: dice.Ics_shop_buyEmoticon): dice.cs_shop_buyEmoticon;

        /**
         * Encodes the specified cs_shop_buyEmoticon message. Does not implicitly {@link dice.cs_shop_buyEmoticon.verify|verify} messages.
         * @param message cs_shop_buyEmoticon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_shop_buyEmoticon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_shop_buyEmoticon message, length delimited. Does not implicitly {@link dice.cs_shop_buyEmoticon.verify|verify} messages.
         * @param message cs_shop_buyEmoticon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_shop_buyEmoticon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_shop_buyEmoticon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_shop_buyEmoticon;

        /**
         * Decodes a cs_shop_buyEmoticon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_shop_buyEmoticon;

        /**
         * Verifies a cs_shop_buyEmoticon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_shop_buyEmoticon. */
    interface Isc_shop_buyEmoticon {
    }

    /** Represents a sc_shop_buyEmoticon. */
    class sc_shop_buyEmoticon implements Isc_shop_buyEmoticon {

        /**
         * Constructs a new sc_shop_buyEmoticon.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_shop_buyEmoticon);

        /**
         * Creates a new sc_shop_buyEmoticon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_shop_buyEmoticon instance
         */
        public static create(properties?: dice.Isc_shop_buyEmoticon): dice.sc_shop_buyEmoticon;

        /**
         * Encodes the specified sc_shop_buyEmoticon message. Does not implicitly {@link dice.sc_shop_buyEmoticon.verify|verify} messages.
         * @param message sc_shop_buyEmoticon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_shop_buyEmoticon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_shop_buyEmoticon message, length delimited. Does not implicitly {@link dice.sc_shop_buyEmoticon.verify|verify} messages.
         * @param message sc_shop_buyEmoticon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_shop_buyEmoticon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_shop_buyEmoticon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_shop_buyEmoticon;

        /**
         * Decodes a sc_shop_buyEmoticon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_shop_buyEmoticon;

        /**
         * Verifies a sc_shop_buyEmoticon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_dice_upgrade. */
    interface Ics_dice_upgrade {

        /** cs_dice_upgrade diceId */
        diceId?: (string|null);
    }

    /** Represents a cs_dice_upgrade. */
    class cs_dice_upgrade implements Ics_dice_upgrade {

        /**
         * Constructs a new cs_dice_upgrade.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_dice_upgrade);

        /** cs_dice_upgrade diceId. */
        public diceId: string;

        /**
         * Creates a new cs_dice_upgrade instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_dice_upgrade instance
         */
        public static create(properties?: dice.Ics_dice_upgrade): dice.cs_dice_upgrade;

        /**
         * Encodes the specified cs_dice_upgrade message. Does not implicitly {@link dice.cs_dice_upgrade.verify|verify} messages.
         * @param message cs_dice_upgrade message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_dice_upgrade, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_dice_upgrade message, length delimited. Does not implicitly {@link dice.cs_dice_upgrade.verify|verify} messages.
         * @param message cs_dice_upgrade message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_dice_upgrade, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_dice_upgrade message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_dice_upgrade;

        /**
         * Decodes a cs_dice_upgrade message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_dice_upgrade;

        /**
         * Verifies a cs_dice_upgrade message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_dice_upgrade. */
    interface Isc_dice_upgrade {
    }

    /** Represents a sc_dice_upgrade. */
    class sc_dice_upgrade implements Isc_dice_upgrade {

        /**
         * Constructs a new sc_dice_upgrade.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_dice_upgrade);

        /**
         * Creates a new sc_dice_upgrade instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_dice_upgrade instance
         */
        public static create(properties?: dice.Isc_dice_upgrade): dice.sc_dice_upgrade;

        /**
         * Encodes the specified sc_dice_upgrade message. Does not implicitly {@link dice.sc_dice_upgrade.verify|verify} messages.
         * @param message sc_dice_upgrade message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_dice_upgrade, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_dice_upgrade message, length delimited. Does not implicitly {@link dice.sc_dice_upgrade.verify|verify} messages.
         * @param message sc_dice_upgrade message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_dice_upgrade, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_dice_upgrade message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_dice_upgrade;

        /**
         * Decodes a sc_dice_upgrade message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_dice_upgrade;

        /**
         * Verifies a sc_dice_upgrade message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_dice_use. */
    interface Ics_dice_use {

        /** cs_dice_use diceId */
        diceId?: (string|null);

        /** cs_dice_use lineNo */
        lineNo?: (number|null);

        /** cs_dice_use upPos */
        upPos?: (number|null);
    }

    /** Represents a cs_dice_use. */
    class cs_dice_use implements Ics_dice_use {

        /**
         * Constructs a new cs_dice_use.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_dice_use);

        /** cs_dice_use diceId. */
        public diceId: string;

        /** cs_dice_use lineNo. */
        public lineNo: number;

        /** cs_dice_use upPos. */
        public upPos: number;

        /**
         * Creates a new cs_dice_use instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_dice_use instance
         */
        public static create(properties?: dice.Ics_dice_use): dice.cs_dice_use;

        /**
         * Encodes the specified cs_dice_use message. Does not implicitly {@link dice.cs_dice_use.verify|verify} messages.
         * @param message cs_dice_use message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_dice_use, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_dice_use message, length delimited. Does not implicitly {@link dice.cs_dice_use.verify|verify} messages.
         * @param message cs_dice_use message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_dice_use, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_dice_use message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_dice_use;

        /**
         * Decodes a cs_dice_use message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_dice_use;

        /**
         * Verifies a cs_dice_use message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_dice_use. */
    interface Isc_dice_use {
    }

    /** Represents a sc_dice_use. */
    class sc_dice_use implements Isc_dice_use {

        /**
         * Constructs a new sc_dice_use.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_dice_use);

        /**
         * Creates a new sc_dice_use instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_dice_use instance
         */
        public static create(properties?: dice.Isc_dice_use): dice.sc_dice_use;

        /**
         * Encodes the specified sc_dice_use message. Does not implicitly {@link dice.sc_dice_use.verify|verify} messages.
         * @param message sc_dice_use message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_dice_use, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_dice_use message, length delimited. Does not implicitly {@link dice.sc_dice_use.verify|verify} messages.
         * @param message sc_dice_use message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_dice_use, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_dice_use message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_dice_use;

        /**
         * Decodes a sc_dice_use message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_dice_use;

        /**
         * Verifies a sc_dice_use message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_dice_chooseLine. */
    interface Ics_dice_chooseLine {

        /** cs_dice_chooseLine lineNo */
        lineNo?: (number|null);
    }

    /** Represents a cs_dice_chooseLine. */
    class cs_dice_chooseLine implements Ics_dice_chooseLine {

        /**
         * Constructs a new cs_dice_chooseLine.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_dice_chooseLine);

        /** cs_dice_chooseLine lineNo. */
        public lineNo: number;

        /**
         * Creates a new cs_dice_chooseLine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_dice_chooseLine instance
         */
        public static create(properties?: dice.Ics_dice_chooseLine): dice.cs_dice_chooseLine;

        /**
         * Encodes the specified cs_dice_chooseLine message. Does not implicitly {@link dice.cs_dice_chooseLine.verify|verify} messages.
         * @param message cs_dice_chooseLine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_dice_chooseLine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_dice_chooseLine message, length delimited. Does not implicitly {@link dice.cs_dice_chooseLine.verify|verify} messages.
         * @param message cs_dice_chooseLine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_dice_chooseLine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_dice_chooseLine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_dice_chooseLine;

        /**
         * Decodes a cs_dice_chooseLine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_dice_chooseLine;

        /**
         * Verifies a cs_dice_chooseLine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_dice_chooseLine. */
    interface Isc_dice_chooseLine {
    }

    /** Represents a sc_dice_chooseLine. */
    class sc_dice_chooseLine implements Isc_dice_chooseLine {

        /**
         * Constructs a new sc_dice_chooseLine.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_dice_chooseLine);

        /**
         * Creates a new sc_dice_chooseLine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_dice_chooseLine instance
         */
        public static create(properties?: dice.Isc_dice_chooseLine): dice.sc_dice_chooseLine;

        /**
         * Encodes the specified sc_dice_chooseLine message. Does not implicitly {@link dice.sc_dice_chooseLine.verify|verify} messages.
         * @param message sc_dice_chooseLine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_dice_chooseLine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_dice_chooseLine message, length delimited. Does not implicitly {@link dice.sc_dice_chooseLine.verify|verify} messages.
         * @param message sc_dice_chooseLine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_dice_chooseLine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_dice_chooseLine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_dice_chooseLine;

        /**
         * Decodes a sc_dice_chooseLine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_dice_chooseLine;

        /**
         * Verifies a sc_dice_chooseLine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_dice_buySkin. */
    interface Ics_dice_buySkin {

        /** cs_dice_buySkin skinId */
        skinId?: (string|null);
    }

    /** Represents a cs_dice_buySkin. */
    class cs_dice_buySkin implements Ics_dice_buySkin {

        /**
         * Constructs a new cs_dice_buySkin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_dice_buySkin);

        /** cs_dice_buySkin skinId. */
        public skinId: string;

        /**
         * Creates a new cs_dice_buySkin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_dice_buySkin instance
         */
        public static create(properties?: dice.Ics_dice_buySkin): dice.cs_dice_buySkin;

        /**
         * Encodes the specified cs_dice_buySkin message. Does not implicitly {@link dice.cs_dice_buySkin.verify|verify} messages.
         * @param message cs_dice_buySkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_dice_buySkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_dice_buySkin message, length delimited. Does not implicitly {@link dice.cs_dice_buySkin.verify|verify} messages.
         * @param message cs_dice_buySkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_dice_buySkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_dice_buySkin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_dice_buySkin;

        /**
         * Decodes a cs_dice_buySkin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_dice_buySkin;

        /**
         * Verifies a cs_dice_buySkin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_dice_buySkin. */
    interface Isc_dice_buySkin {
    }

    /** Represents a sc_dice_buySkin. */
    class sc_dice_buySkin implements Isc_dice_buySkin {

        /**
         * Constructs a new sc_dice_buySkin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_dice_buySkin);

        /**
         * Creates a new sc_dice_buySkin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_dice_buySkin instance
         */
        public static create(properties?: dice.Isc_dice_buySkin): dice.sc_dice_buySkin;

        /**
         * Encodes the specified sc_dice_buySkin message. Does not implicitly {@link dice.sc_dice_buySkin.verify|verify} messages.
         * @param message sc_dice_buySkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_dice_buySkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_dice_buySkin message, length delimited. Does not implicitly {@link dice.sc_dice_buySkin.verify|verify} messages.
         * @param message sc_dice_buySkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_dice_buySkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_dice_buySkin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_dice_buySkin;

        /**
         * Decodes a sc_dice_buySkin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_dice_buySkin;

        /**
         * Verifies a sc_dice_buySkin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_dice_chooseSkin. */
    interface Ics_dice_chooseSkin {

        /** cs_dice_chooseSkin skinId */
        skinId?: (string|null);
    }

    /** Represents a cs_dice_chooseSkin. */
    class cs_dice_chooseSkin implements Ics_dice_chooseSkin {

        /**
         * Constructs a new cs_dice_chooseSkin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_dice_chooseSkin);

        /** cs_dice_chooseSkin skinId. */
        public skinId: string;

        /**
         * Creates a new cs_dice_chooseSkin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_dice_chooseSkin instance
         */
        public static create(properties?: dice.Ics_dice_chooseSkin): dice.cs_dice_chooseSkin;

        /**
         * Encodes the specified cs_dice_chooseSkin message. Does not implicitly {@link dice.cs_dice_chooseSkin.verify|verify} messages.
         * @param message cs_dice_chooseSkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_dice_chooseSkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_dice_chooseSkin message, length delimited. Does not implicitly {@link dice.cs_dice_chooseSkin.verify|verify} messages.
         * @param message cs_dice_chooseSkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_dice_chooseSkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_dice_chooseSkin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_dice_chooseSkin;

        /**
         * Decodes a cs_dice_chooseSkin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_dice_chooseSkin;

        /**
         * Verifies a cs_dice_chooseSkin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_dice_chooseSkin. */
    interface Isc_dice_chooseSkin {
    }

    /** Represents a sc_dice_chooseSkin. */
    class sc_dice_chooseSkin implements Isc_dice_chooseSkin {

        /**
         * Constructs a new sc_dice_chooseSkin.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_dice_chooseSkin);

        /**
         * Creates a new sc_dice_chooseSkin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_dice_chooseSkin instance
         */
        public static create(properties?: dice.Isc_dice_chooseSkin): dice.sc_dice_chooseSkin;

        /**
         * Encodes the specified sc_dice_chooseSkin message. Does not implicitly {@link dice.sc_dice_chooseSkin.verify|verify} messages.
         * @param message sc_dice_chooseSkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_dice_chooseSkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_dice_chooseSkin message, length delimited. Does not implicitly {@link dice.sc_dice_chooseSkin.verify|verify} messages.
         * @param message sc_dice_chooseSkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_dice_chooseSkin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_dice_chooseSkin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_dice_chooseSkin;

        /**
         * Decodes a sc_dice_chooseSkin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_dice_chooseSkin;

        /**
         * Verifies a sc_dice_chooseSkin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_mail_getmymaillist. */
    interface Ics_mail_getmymaillist {
    }

    /** Represents a cs_mail_getmymaillist. */
    class cs_mail_getmymaillist implements Ics_mail_getmymaillist {

        /**
         * Constructs a new cs_mail_getmymaillist.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_mail_getmymaillist);

        /**
         * Creates a new cs_mail_getmymaillist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_mail_getmymaillist instance
         */
        public static create(properties?: dice.Ics_mail_getmymaillist): dice.cs_mail_getmymaillist;

        /**
         * Encodes the specified cs_mail_getmymaillist message. Does not implicitly {@link dice.cs_mail_getmymaillist.verify|verify} messages.
         * @param message cs_mail_getmymaillist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_mail_getmymaillist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_mail_getmymaillist message, length delimited. Does not implicitly {@link dice.cs_mail_getmymaillist.verify|verify} messages.
         * @param message cs_mail_getmymaillist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_mail_getmymaillist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_mail_getmymaillist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_mail_getmymaillist;

        /**
         * Decodes a cs_mail_getmymaillist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_mail_getmymaillist;

        /**
         * Verifies a cs_mail_getmymaillist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_mail_getmymaillist. */
    interface Isc_mail_getmymaillist {
    }

    /** Represents a sc_mail_getmymaillist. */
    class sc_mail_getmymaillist implements Isc_mail_getmymaillist {

        /**
         * Constructs a new sc_mail_getmymaillist.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_mail_getmymaillist);

        /**
         * Creates a new sc_mail_getmymaillist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_mail_getmymaillist instance
         */
        public static create(properties?: dice.Isc_mail_getmymaillist): dice.sc_mail_getmymaillist;

        /**
         * Encodes the specified sc_mail_getmymaillist message. Does not implicitly {@link dice.sc_mail_getmymaillist.verify|verify} messages.
         * @param message sc_mail_getmymaillist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_mail_getmymaillist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_mail_getmymaillist message, length delimited. Does not implicitly {@link dice.sc_mail_getmymaillist.verify|verify} messages.
         * @param message sc_mail_getmymaillist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_mail_getmymaillist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_mail_getmymaillist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_mail_getmymaillist;

        /**
         * Decodes a sc_mail_getmymaillist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_mail_getmymaillist;

        /**
         * Verifies a sc_mail_getmymaillist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_mail_getReward. */
    interface Ics_mail_getReward {

        /** cs_mail_getReward mailId */
        mailId?: (string|null);
    }

    /** Represents a cs_mail_getReward. */
    class cs_mail_getReward implements Ics_mail_getReward {

        /**
         * Constructs a new cs_mail_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_mail_getReward);

        /** cs_mail_getReward mailId. */
        public mailId: string;

        /**
         * Creates a new cs_mail_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_mail_getReward instance
         */
        public static create(properties?: dice.Ics_mail_getReward): dice.cs_mail_getReward;

        /**
         * Encodes the specified cs_mail_getReward message. Does not implicitly {@link dice.cs_mail_getReward.verify|verify} messages.
         * @param message cs_mail_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_mail_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_mail_getReward message, length delimited. Does not implicitly {@link dice.cs_mail_getReward.verify|verify} messages.
         * @param message cs_mail_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_mail_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_mail_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_mail_getReward;

        /**
         * Decodes a cs_mail_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_mail_getReward;

        /**
         * Verifies a cs_mail_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_mail_getReward. */
    interface Isc_mail_getReward {

        /** sc_mail_getReward rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_mail_getReward. */
    class sc_mail_getReward implements Isc_mail_getReward {

        /**
         * Constructs a new sc_mail_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_mail_getReward);

        /** sc_mail_getReward rewards. */
        public rewards: string;

        /**
         * Creates a new sc_mail_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_mail_getReward instance
         */
        public static create(properties?: dice.Isc_mail_getReward): dice.sc_mail_getReward;

        /**
         * Encodes the specified sc_mail_getReward message. Does not implicitly {@link dice.sc_mail_getReward.verify|verify} messages.
         * @param message sc_mail_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_mail_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_mail_getReward message, length delimited. Does not implicitly {@link dice.sc_mail_getReward.verify|verify} messages.
         * @param message sc_mail_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_mail_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_mail_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_mail_getReward;

        /**
         * Decodes a sc_mail_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_mail_getReward;

        /**
         * Verifies a sc_mail_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_pay_processpayment. */
    interface Ics_pay_processpayment {

        /** cs_pay_processpayment order_id */
        order_id?: (string|null);

        /** cs_pay_processpayment name */
        name?: (string|null);
    }

    /** Represents a cs_pay_processpayment. */
    class cs_pay_processpayment implements Ics_pay_processpayment {

        /**
         * Constructs a new cs_pay_processpayment.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_pay_processpayment);

        /** cs_pay_processpayment order_id. */
        public order_id: string;

        /** cs_pay_processpayment name. */
        public name: string;

        /**
         * Creates a new cs_pay_processpayment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_pay_processpayment instance
         */
        public static create(properties?: dice.Ics_pay_processpayment): dice.cs_pay_processpayment;

        /**
         * Encodes the specified cs_pay_processpayment message. Does not implicitly {@link dice.cs_pay_processpayment.verify|verify} messages.
         * @param message cs_pay_processpayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_pay_processpayment, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_pay_processpayment message, length delimited. Does not implicitly {@link dice.cs_pay_processpayment.verify|verify} messages.
         * @param message cs_pay_processpayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_pay_processpayment, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_pay_processpayment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_pay_processpayment;

        /**
         * Decodes a cs_pay_processpayment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_pay_processpayment;

        /**
         * Verifies a cs_pay_processpayment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_pay_processpayment. */
    interface Isc_pay_processpayment {
    }

    /** Represents a sc_pay_processpayment. */
    class sc_pay_processpayment implements Isc_pay_processpayment {

        /**
         * Constructs a new sc_pay_processpayment.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_pay_processpayment);

        /**
         * Creates a new sc_pay_processpayment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_pay_processpayment instance
         */
        public static create(properties?: dice.Isc_pay_processpayment): dice.sc_pay_processpayment;

        /**
         * Encodes the specified sc_pay_processpayment message. Does not implicitly {@link dice.sc_pay_processpayment.verify|verify} messages.
         * @param message sc_pay_processpayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_pay_processpayment, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_pay_processpayment message, length delimited. Does not implicitly {@link dice.sc_pay_processpayment.verify|verify} messages.
         * @param message sc_pay_processpayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_pay_processpayment, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_pay_processpayment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_pay_processpayment;

        /**
         * Decodes a sc_pay_processpayment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_pay_processpayment;

        /**
         * Verifies a sc_pay_processpayment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_push_pay. */
    interface Isc_push_pay {

        /** sc_push_pay rewards */
        rewards?: (string|null);

        /** sc_push_pay payment */
        payment?: (dice.sc_push_pay.IPayment|null);
    }

    /** Represents a sc_push_pay. */
    class sc_push_pay implements Isc_push_pay {

        /**
         * Constructs a new sc_push_pay.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_push_pay);

        /** sc_push_pay rewards. */
        public rewards: string;

        /** sc_push_pay payment. */
        public payment?: (dice.sc_push_pay.IPayment|null);

        /**
         * Creates a new sc_push_pay instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_push_pay instance
         */
        public static create(properties?: dice.Isc_push_pay): dice.sc_push_pay;

        /**
         * Encodes the specified sc_push_pay message. Does not implicitly {@link dice.sc_push_pay.verify|verify} messages.
         * @param message sc_push_pay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_push_pay, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_push_pay message, length delimited. Does not implicitly {@link dice.sc_push_pay.verify|verify} messages.
         * @param message sc_push_pay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_push_pay, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_push_pay message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_push_pay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_push_pay;

        /**
         * Decodes a sc_push_pay message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_push_pay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_push_pay;

        /**
         * Verifies a sc_push_pay message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_push_pay {

        /** Properties of a Payment. */
        interface IPayment {

            /** Payment itemId */
            itemId?: (string|null);

            /** Payment num */
            num?: (number|null);

            /** Payment orderId */
            orderId?: (string|null);

            /** Payment amount */
            amount?: (string|null);

            /** Payment extra_num */
            extra_num?: (number|null);
        }

        /** Represents a Payment. */
        class Payment implements IPayment {

            /**
             * Constructs a new Payment.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_push_pay.IPayment);

            /** Payment itemId. */
            public itemId: string;

            /** Payment num. */
            public num: number;

            /** Payment orderId. */
            public orderId: string;

            /** Payment amount. */
            public amount: string;

            /** Payment extra_num. */
            public extra_num: number;

            /**
             * Creates a new Payment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Payment instance
             */
            public static create(properties?: dice.sc_push_pay.IPayment): dice.sc_push_pay.Payment;

            /**
             * Encodes the specified Payment message. Does not implicitly {@link dice.sc_push_pay.Payment.verify|verify} messages.
             * @param message Payment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_push_pay.IPayment, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Payment message, length delimited. Does not implicitly {@link dice.sc_push_pay.Payment.verify|verify} messages.
             * @param message Payment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_push_pay.IPayment, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a Payment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Payment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_push_pay.Payment;

            /**
             * Decodes a Payment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Payment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_push_pay.Payment;

            /**
             * Verifies a Payment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a sc_push_inviteFriend. */
    interface Isc_push_inviteFriend {
    }

    /** Represents a sc_push_inviteFriend. */
    class sc_push_inviteFriend implements Isc_push_inviteFriend {

        /**
         * Constructs a new sc_push_inviteFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_push_inviteFriend);

        /**
         * Creates a new sc_push_inviteFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_push_inviteFriend instance
         */
        public static create(properties?: dice.Isc_push_inviteFriend): dice.sc_push_inviteFriend;

        /**
         * Encodes the specified sc_push_inviteFriend message. Does not implicitly {@link dice.sc_push_inviteFriend.verify|verify} messages.
         * @param message sc_push_inviteFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_push_inviteFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_push_inviteFriend message, length delimited. Does not implicitly {@link dice.sc_push_inviteFriend.verify|verify} messages.
         * @param message sc_push_inviteFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_push_inviteFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_push_inviteFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_push_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_push_inviteFriend;

        /**
         * Decodes a sc_push_inviteFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_push_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_push_inviteFriend;

        /**
         * Verifies a sc_push_inviteFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_rank_getPvp. */
    interface Ics_rank_getPvp {
    }

    /** Represents a cs_rank_getPvp. */
    class cs_rank_getPvp implements Ics_rank_getPvp {

        /**
         * Constructs a new cs_rank_getPvp.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_rank_getPvp);

        /**
         * Creates a new cs_rank_getPvp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_rank_getPvp instance
         */
        public static create(properties?: dice.Ics_rank_getPvp): dice.cs_rank_getPvp;

        /**
         * Encodes the specified cs_rank_getPvp message. Does not implicitly {@link dice.cs_rank_getPvp.verify|verify} messages.
         * @param message cs_rank_getPvp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_rank_getPvp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_rank_getPvp message, length delimited. Does not implicitly {@link dice.cs_rank_getPvp.verify|verify} messages.
         * @param message cs_rank_getPvp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_rank_getPvp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_rank_getPvp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_rank_getPvp;

        /**
         * Decodes a cs_rank_getPvp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_rank_getPvp;

        /**
         * Verifies a cs_rank_getPvp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_rank_getPvp. */
    interface Isc_rank_getPvp {

        /** sc_rank_getPvp pvpRank */
        pvpRank?: (dice.sc_rank_getPvp.IRankData[]|null);
    }

    /** Represents a sc_rank_getPvp. */
    class sc_rank_getPvp implements Isc_rank_getPvp {

        /**
         * Constructs a new sc_rank_getPvp.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_rank_getPvp);

        /** sc_rank_getPvp pvpRank. */
        public pvpRank: dice.sc_rank_getPvp.IRankData[];

        /**
         * Creates a new sc_rank_getPvp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_rank_getPvp instance
         */
        public static create(properties?: dice.Isc_rank_getPvp): dice.sc_rank_getPvp;

        /**
         * Encodes the specified sc_rank_getPvp message. Does not implicitly {@link dice.sc_rank_getPvp.verify|verify} messages.
         * @param message sc_rank_getPvp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_rank_getPvp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_rank_getPvp message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.verify|verify} messages.
         * @param message sc_rank_getPvp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_rank_getPvp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_rank_getPvp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPvp;

        /**
         * Decodes a sc_rank_getPvp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPvp;

        /**
         * Verifies a sc_rank_getPvp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_rank_getPvp {

        /** Properties of a RankData. */
        interface IRankData {

            /** RankData value */
            value?: (number|null);

            /** RankData score */
            score?: (number|null);

            /** RankData level */
            level?: (number|null);

            /** RankData name */
            name?: (string|null);

            /** RankData uid */
            uid?: (number|null);

            /** RankData line */
            line?: (dice.sc_rank_getPvp.RankData.ILineModelInfo[]|null);
        }

        /** Represents a RankData. */
        class RankData implements IRankData {

            /**
             * Constructs a new RankData.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_rank_getPvp.IRankData);

            /** RankData value. */
            public value: number;

            /** RankData score. */
            public score: number;

            /** RankData level. */
            public level: number;

            /** RankData name. */
            public name: string;

            /** RankData uid. */
            public uid: number;

            /** RankData line. */
            public line: dice.sc_rank_getPvp.RankData.ILineModelInfo[];

            /**
             * Creates a new RankData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RankData instance
             */
            public static create(properties?: dice.sc_rank_getPvp.IRankData): dice.sc_rank_getPvp.RankData;

            /**
             * Encodes the specified RankData message. Does not implicitly {@link dice.sc_rank_getPvp.RankData.verify|verify} messages.
             * @param message RankData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_rank_getPvp.IRankData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified RankData message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.RankData.verify|verify} messages.
             * @param message RankData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_rank_getPvp.IRankData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a RankData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPvp.RankData;

            /**
             * Decodes a RankData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPvp.RankData;

            /**
             * Verifies a RankData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        namespace RankData {

            /** Properties of a LineModelInfo. */
            interface ILineModelInfo {

                /** LineModelInfo id */
                id?: (string|null);
            }

            /** Represents a LineModelInfo. */
            class LineModelInfo implements ILineModelInfo {

                /**
                 * Constructs a new LineModelInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dice.sc_rank_getPvp.RankData.ILineModelInfo);

                /** LineModelInfo id. */
                public id: string;

                /**
                 * Creates a new LineModelInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LineModelInfo instance
                 */
                public static create(properties?: dice.sc_rank_getPvp.RankData.ILineModelInfo): dice.sc_rank_getPvp.RankData.LineModelInfo;

                /**
                 * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.sc_rank_getPvp.RankData.LineModelInfo.verify|verify} messages.
                 * @param message LineModelInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dice.sc_rank_getPvp.RankData.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.RankData.LineModelInfo.verify|verify} messages.
                 * @param message LineModelInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dice.sc_rank_getPvp.RankData.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPvp.RankData.LineModelInfo;

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPvp.RankData.LineModelInfo;

                /**
                 * Verifies a LineModelInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
            }
        }
    }

    /** Properties of a cs_rank_getPve. */
    interface Ics_rank_getPve {
    }

    /** Represents a cs_rank_getPve. */
    class cs_rank_getPve implements Ics_rank_getPve {

        /**
         * Constructs a new cs_rank_getPve.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_rank_getPve);

        /**
         * Creates a new cs_rank_getPve instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_rank_getPve instance
         */
        public static create(properties?: dice.Ics_rank_getPve): dice.cs_rank_getPve;

        /**
         * Encodes the specified cs_rank_getPve message. Does not implicitly {@link dice.cs_rank_getPve.verify|verify} messages.
         * @param message cs_rank_getPve message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_rank_getPve, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_rank_getPve message, length delimited. Does not implicitly {@link dice.cs_rank_getPve.verify|verify} messages.
         * @param message cs_rank_getPve message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_rank_getPve, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_rank_getPve message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_rank_getPve;

        /**
         * Decodes a cs_rank_getPve message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_rank_getPve;

        /**
         * Verifies a cs_rank_getPve message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_rank_getPve. */
    interface Isc_rank_getPve {

        /** sc_rank_getPve pveRank */
        pveRank?: (dice.sc_rank_getPve.IRankData[]|null);
    }

    /** Represents a sc_rank_getPve. */
    class sc_rank_getPve implements Isc_rank_getPve {

        /**
         * Constructs a new sc_rank_getPve.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_rank_getPve);

        /** sc_rank_getPve pveRank. */
        public pveRank: dice.sc_rank_getPve.IRankData[];

        /**
         * Creates a new sc_rank_getPve instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_rank_getPve instance
         */
        public static create(properties?: dice.Isc_rank_getPve): dice.sc_rank_getPve;

        /**
         * Encodes the specified sc_rank_getPve message. Does not implicitly {@link dice.sc_rank_getPve.verify|verify} messages.
         * @param message sc_rank_getPve message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_rank_getPve, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_rank_getPve message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.verify|verify} messages.
         * @param message sc_rank_getPve message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_rank_getPve, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_rank_getPve message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPve;

        /**
         * Decodes a sc_rank_getPve message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPve;

        /**
         * Verifies a sc_rank_getPve message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_rank_getPve {

        /** Properties of a RankData. */
        interface IRankData {

            /** RankData value */
            value?: (number|null);

            /** RankData score */
            score?: (number|null);

            /** RankData level */
            level?: (number|null);

            /** RankData name */
            name?: (string|null);

            /** RankData uid */
            uid?: (number|null);

            /** RankData line */
            line?: (dice.sc_rank_getPve.RankData.ILineModelInfo[]|null);

            /** RankData fscore */
            fscore?: (number|null);

            /** RankData flevel */
            flevel?: (number|null);

            /** RankData fname */
            fname?: (string|null);

            /** RankData fuid */
            fuid?: (number|null);

            /** RankData fline */
            fline?: (dice.sc_rank_getPve.RankData.ILineModelInfo[]|null);
        }

        /** Represents a RankData. */
        class RankData implements IRankData {

            /**
             * Constructs a new RankData.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_rank_getPve.IRankData);

            /** RankData value. */
            public value: number;

            /** RankData score. */
            public score: number;

            /** RankData level. */
            public level: number;

            /** RankData name. */
            public name: string;

            /** RankData uid. */
            public uid: number;

            /** RankData line. */
            public line: dice.sc_rank_getPve.RankData.ILineModelInfo[];

            /** RankData fscore. */
            public fscore: number;

            /** RankData flevel. */
            public flevel: number;

            /** RankData fname. */
            public fname: string;

            /** RankData fuid. */
            public fuid: number;

            /** RankData fline. */
            public fline: dice.sc_rank_getPve.RankData.ILineModelInfo[];

            /**
             * Creates a new RankData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RankData instance
             */
            public static create(properties?: dice.sc_rank_getPve.IRankData): dice.sc_rank_getPve.RankData;

            /**
             * Encodes the specified RankData message. Does not implicitly {@link dice.sc_rank_getPve.RankData.verify|verify} messages.
             * @param message RankData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_rank_getPve.IRankData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified RankData message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.RankData.verify|verify} messages.
             * @param message RankData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_rank_getPve.IRankData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a RankData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPve.RankData;

            /**
             * Decodes a RankData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPve.RankData;

            /**
             * Verifies a RankData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        namespace RankData {

            /** Properties of a LineModelInfo. */
            interface ILineModelInfo {

                /** LineModelInfo id */
                id?: (string|null);
            }

            /** Represents a LineModelInfo. */
            class LineModelInfo implements ILineModelInfo {

                /**
                 * Constructs a new LineModelInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dice.sc_rank_getPve.RankData.ILineModelInfo);

                /** LineModelInfo id. */
                public id: string;

                /**
                 * Creates a new LineModelInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LineModelInfo instance
                 */
                public static create(properties?: dice.sc_rank_getPve.RankData.ILineModelInfo): dice.sc_rank_getPve.RankData.LineModelInfo;

                /**
                 * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.sc_rank_getPve.RankData.LineModelInfo.verify|verify} messages.
                 * @param message LineModelInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dice.sc_rank_getPve.RankData.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.RankData.LineModelInfo.verify|verify} messages.
                 * @param message LineModelInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dice.sc_rank_getPve.RankData.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_rank_getPve.RankData.LineModelInfo;

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_rank_getPve.RankData.LineModelInfo;

                /**
                 * Verifies a LineModelInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
            }
        }
    }

    /** Properties of a cs_battle_find. */
    interface Ics_battle_find {

        /** cs_battle_find findType */
        findType?: (number|null);

        /** cs_battle_find findNum */
        findNum?: (number|null);
    }

    /** Represents a cs_battle_find. */
    class cs_battle_find implements Ics_battle_find {

        /**
         * Constructs a new cs_battle_find.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_find);

        /** cs_battle_find findType. */
        public findType: number;

        /** cs_battle_find findNum. */
        public findNum: number;

        /**
         * Creates a new cs_battle_find instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_find instance
         */
        public static create(properties?: dice.Ics_battle_find): dice.cs_battle_find;

        /**
         * Encodes the specified cs_battle_find message. Does not implicitly {@link dice.cs_battle_find.verify|verify} messages.
         * @param message cs_battle_find message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_find, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_find message, length delimited. Does not implicitly {@link dice.cs_battle_find.verify|verify} messages.
         * @param message cs_battle_find message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_find, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_find message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_find;

        /**
         * Decodes a cs_battle_find message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_find;

        /**
         * Verifies a cs_battle_find message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_find. */
    interface Isc_battle_find {

        /** sc_battle_find matchFlag */
        matchFlag?: (number|null);

        /** sc_battle_find randSeed */
        randSeed?: (number|null);
    }

    /** Represents a sc_battle_find. */
    class sc_battle_find implements Isc_battle_find {

        /**
         * Constructs a new sc_battle_find.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_find);

        /** sc_battle_find matchFlag. */
        public matchFlag: number;

        /** sc_battle_find randSeed. */
        public randSeed: number;

        /**
         * Creates a new sc_battle_find instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_find instance
         */
        public static create(properties?: dice.Isc_battle_find): dice.sc_battle_find;

        /**
         * Encodes the specified sc_battle_find message. Does not implicitly {@link dice.sc_battle_find.verify|verify} messages.
         * @param message sc_battle_find message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_find, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_find message, length delimited. Does not implicitly {@link dice.sc_battle_find.verify|verify} messages.
         * @param message sc_battle_find message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_find, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_find message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_find;

        /**
         * Decodes a sc_battle_find message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_find;

        /**
         * Verifies a sc_battle_find message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_cancelFind. */
    interface Ics_battle_cancelFind {

        /** cs_battle_cancelFind findType */
        findType?: (number|null);
    }

    /** Represents a cs_battle_cancelFind. */
    class cs_battle_cancelFind implements Ics_battle_cancelFind {

        /**
         * Constructs a new cs_battle_cancelFind.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_cancelFind);

        /** cs_battle_cancelFind findType. */
        public findType: number;

        /**
         * Creates a new cs_battle_cancelFind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_cancelFind instance
         */
        public static create(properties?: dice.Ics_battle_cancelFind): dice.cs_battle_cancelFind;

        /**
         * Encodes the specified cs_battle_cancelFind message. Does not implicitly {@link dice.cs_battle_cancelFind.verify|verify} messages.
         * @param message cs_battle_cancelFind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_cancelFind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_cancelFind message, length delimited. Does not implicitly {@link dice.cs_battle_cancelFind.verify|verify} messages.
         * @param message cs_battle_cancelFind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_cancelFind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_cancelFind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_cancelFind;

        /**
         * Decodes a cs_battle_cancelFind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_cancelFind;

        /**
         * Verifies a cs_battle_cancelFind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_cancelFind. */
    interface Isc_battle_cancelFind {
    }

    /** Represents a sc_battle_cancelFind. */
    class sc_battle_cancelFind implements Isc_battle_cancelFind {

        /**
         * Constructs a new sc_battle_cancelFind.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_cancelFind);

        /**
         * Creates a new sc_battle_cancelFind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_cancelFind instance
         */
        public static create(properties?: dice.Isc_battle_cancelFind): dice.sc_battle_cancelFind;

        /**
         * Encodes the specified sc_battle_cancelFind message. Does not implicitly {@link dice.sc_battle_cancelFind.verify|verify} messages.
         * @param message sc_battle_cancelFind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_cancelFind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_cancelFind message, length delimited. Does not implicitly {@link dice.sc_battle_cancelFind.verify|verify} messages.
         * @param message sc_battle_cancelFind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_cancelFind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_cancelFind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_cancelFind;

        /**
         * Decodes a sc_battle_cancelFind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_cancelFind;

        /**
         * Verifies a sc_battle_cancelFind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_findFriend. */
    interface Ics_battle_findFriend {

        /** cs_battle_findFriend findType */
        findType?: (number|null);

        /** cs_battle_findFriend findNum */
        findNum?: (number|null);

        /** cs_battle_findFriend isCreate */
        isCreate?: (number|null);

        /** cs_battle_findFriend passCode */
        passCode?: (number|null);
    }

    /** Represents a cs_battle_findFriend. */
    class cs_battle_findFriend implements Ics_battle_findFriend {

        /**
         * Constructs a new cs_battle_findFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_findFriend);

        /** cs_battle_findFriend findType. */
        public findType: number;

        /** cs_battle_findFriend findNum. */
        public findNum: number;

        /** cs_battle_findFriend isCreate. */
        public isCreate: number;

        /** cs_battle_findFriend passCode. */
        public passCode: number;

        /**
         * Creates a new cs_battle_findFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_findFriend instance
         */
        public static create(properties?: dice.Ics_battle_findFriend): dice.cs_battle_findFriend;

        /**
         * Encodes the specified cs_battle_findFriend message. Does not implicitly {@link dice.cs_battle_findFriend.verify|verify} messages.
         * @param message cs_battle_findFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_findFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_findFriend message, length delimited. Does not implicitly {@link dice.cs_battle_findFriend.verify|verify} messages.
         * @param message cs_battle_findFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_findFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_findFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_findFriend;

        /**
         * Decodes a cs_battle_findFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_findFriend;

        /**
         * Verifies a cs_battle_findFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_findFriend. */
    interface Isc_battle_findFriend {

        /** sc_battle_findFriend matchFlag */
        matchFlag?: (number|null);

        /** sc_battle_findFriend showRoomId */
        showRoomId?: (number|null);

        /** sc_battle_findFriend noThisRoom */
        noThisRoom?: (number|null);

        /** sc_battle_findFriend randSeed */
        randSeed?: (number|null);
    }

    /** Represents a sc_battle_findFriend. */
    class sc_battle_findFriend implements Isc_battle_findFriend {

        /**
         * Constructs a new sc_battle_findFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_findFriend);

        /** sc_battle_findFriend matchFlag. */
        public matchFlag: number;

        /** sc_battle_findFriend showRoomId. */
        public showRoomId: number;

        /** sc_battle_findFriend noThisRoom. */
        public noThisRoom: number;

        /** sc_battle_findFriend randSeed. */
        public randSeed: number;

        /**
         * Creates a new sc_battle_findFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_findFriend instance
         */
        public static create(properties?: dice.Isc_battle_findFriend): dice.sc_battle_findFriend;

        /**
         * Encodes the specified sc_battle_findFriend message. Does not implicitly {@link dice.sc_battle_findFriend.verify|verify} messages.
         * @param message sc_battle_findFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_findFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_findFriend message, length delimited. Does not implicitly {@link dice.sc_battle_findFriend.verify|verify} messages.
         * @param message sc_battle_findFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_findFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_findFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_findFriend;

        /**
         * Decodes a sc_battle_findFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_findFriend;

        /**
         * Verifies a sc_battle_findFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_cancelFindFriend. */
    interface Ics_battle_cancelFindFriend {

        /** cs_battle_cancelFindFriend findType */
        findType?: (number|null);
    }

    /** Represents a cs_battle_cancelFindFriend. */
    class cs_battle_cancelFindFriend implements Ics_battle_cancelFindFriend {

        /**
         * Constructs a new cs_battle_cancelFindFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_cancelFindFriend);

        /** cs_battle_cancelFindFriend findType. */
        public findType: number;

        /**
         * Creates a new cs_battle_cancelFindFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_cancelFindFriend instance
         */
        public static create(properties?: dice.Ics_battle_cancelFindFriend): dice.cs_battle_cancelFindFriend;

        /**
         * Encodes the specified cs_battle_cancelFindFriend message. Does not implicitly {@link dice.cs_battle_cancelFindFriend.verify|verify} messages.
         * @param message cs_battle_cancelFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_cancelFindFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_cancelFindFriend message, length delimited. Does not implicitly {@link dice.cs_battle_cancelFindFriend.verify|verify} messages.
         * @param message cs_battle_cancelFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_cancelFindFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_cancelFindFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_cancelFindFriend;

        /**
         * Decodes a cs_battle_cancelFindFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_cancelFindFriend;

        /**
         * Verifies a cs_battle_cancelFindFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_cancelFindFriend. */
    interface Isc_battle_cancelFindFriend {
    }

    /** Represents a sc_battle_cancelFindFriend. */
    class sc_battle_cancelFindFriend implements Isc_battle_cancelFindFriend {

        /**
         * Constructs a new sc_battle_cancelFindFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_cancelFindFriend);

        /**
         * Creates a new sc_battle_cancelFindFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_cancelFindFriend instance
         */
        public static create(properties?: dice.Isc_battle_cancelFindFriend): dice.sc_battle_cancelFindFriend;

        /**
         * Encodes the specified sc_battle_cancelFindFriend message. Does not implicitly {@link dice.sc_battle_cancelFindFriend.verify|verify} messages.
         * @param message sc_battle_cancelFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_cancelFindFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_cancelFindFriend message, length delimited. Does not implicitly {@link dice.sc_battle_cancelFindFriend.verify|verify} messages.
         * @param message sc_battle_cancelFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_cancelFindFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_cancelFindFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_cancelFindFriend;

        /**
         * Decodes a sc_battle_cancelFindFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_cancelFindFriend;

        /**
         * Verifies a sc_battle_cancelFindFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_init. */
    interface Ics_battle_init {
    }

    /** Represents a cs_battle_init. */
    class cs_battle_init implements Ics_battle_init {

        /**
         * Constructs a new cs_battle_init.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_init);

        /**
         * Creates a new cs_battle_init instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_init instance
         */
        public static create(properties?: dice.Ics_battle_init): dice.cs_battle_init;

        /**
         * Encodes the specified cs_battle_init message. Does not implicitly {@link dice.cs_battle_init.verify|verify} messages.
         * @param message cs_battle_init message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_init, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_init message, length delimited. Does not implicitly {@link dice.cs_battle_init.verify|verify} messages.
         * @param message cs_battle_init message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_init, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_init message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_init;

        /**
         * Decodes a cs_battle_init message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_init;

        /**
         * Verifies a cs_battle_init message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_init. */
    interface Isc_battle_init {

        /** sc_battle_init initData */
        initData?: (dice.sc_battle_init.IInitData|null);

        /** sc_battle_init startTime */
        startTime?: (number|Long|null);
    }

    /** Represents a sc_battle_init. */
    class sc_battle_init implements Isc_battle_init {

        /**
         * Constructs a new sc_battle_init.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_init);

        /** sc_battle_init initData. */
        public initData?: (dice.sc_battle_init.IInitData|null);

        /** sc_battle_init startTime. */
        public startTime: (number|Long);

        /**
         * Creates a new sc_battle_init instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_init instance
         */
        public static create(properties?: dice.Isc_battle_init): dice.sc_battle_init;

        /**
         * Encodes the specified sc_battle_init message. Does not implicitly {@link dice.sc_battle_init.verify|verify} messages.
         * @param message sc_battle_init message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_init, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_init message, length delimited. Does not implicitly {@link dice.sc_battle_init.verify|verify} messages.
         * @param message sc_battle_init message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_init, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_init message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_init;

        /**
         * Decodes a sc_battle_init message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_init;

        /**
         * Verifies a sc_battle_init message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_battle_init {

        /** Properties of an InitData. */
        interface IInitData {

            /** InitData player */
            player?: ({ [k: string]: dice.sc_battle_init.IPlayer }|null);

            /** InitData frame */
            frame?: (number|null);

            /** InitData isFriend */
            isFriend?: (number|null);
        }

        /** Represents an InitData. */
        class InitData implements IInitData {

            /**
             * Constructs a new InitData.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_init.IInitData);

            /** InitData player. */
            public player: { [k: string]: dice.sc_battle_init.IPlayer };

            /** InitData frame. */
            public frame: number;

            /** InitData isFriend. */
            public isFriend: number;

            /**
             * Creates a new InitData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InitData instance
             */
            public static create(properties?: dice.sc_battle_init.IInitData): dice.sc_battle_init.InitData;

            /**
             * Encodes the specified InitData message. Does not implicitly {@link dice.sc_battle_init.InitData.verify|verify} messages.
             * @param message InitData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_init.IInitData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified InitData message, length delimited. Does not implicitly {@link dice.sc_battle_init.InitData.verify|verify} messages.
             * @param message InitData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_init.IInitData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an InitData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InitData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_init.InitData;

            /**
             * Decodes an InitData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InitData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_init.InitData;

            /**
             * Verifies an InitData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a Player. */
        interface IPlayer {

            /** Player uid */
            uid?: (number|null);

            /** Player name */
            name?: (string|null);

            /** Player level */
            level?: (number|null);

            /** Player win */
            win?: (number|null);

            /** Player lose */
            lose?: (number|null);

            /** Player score */
            score?: (number|null);

            /** Player crivalue */
            crivalue?: (number|null);

            /** Player zengfu */
            zengfu?: (number|null);

            /** Player upInfo */
            upInfo?: (dice.sc_battle_init.IUpInfo[]|null);

            /** Player skin */
            skin?: (string|null);

            /** Player diceNum */
            diceNum?: (number|null);

            /** Player strategy */
            strategy?: (number|null);
        }

        /** Represents a Player. */
        class Player implements IPlayer {

            /**
             * Constructs a new Player.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_init.IPlayer);

            /** Player uid. */
            public uid: number;

            /** Player name. */
            public name: string;

            /** Player level. */
            public level: number;

            /** Player win. */
            public win: number;

            /** Player lose. */
            public lose: number;

            /** Player score. */
            public score: number;

            /** Player crivalue. */
            public crivalue: number;

            /** Player zengfu. */
            public zengfu: number;

            /** Player upInfo. */
            public upInfo: dice.sc_battle_init.IUpInfo[];

            /** Player skin. */
            public skin: string;

            /** Player diceNum. */
            public diceNum: number;

            /** Player strategy. */
            public strategy: number;

            /**
             * Creates a new Player instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Player instance
             */
            public static create(properties?: dice.sc_battle_init.IPlayer): dice.sc_battle_init.Player;

            /**
             * Encodes the specified Player message. Does not implicitly {@link dice.sc_battle_init.Player.verify|verify} messages.
             * @param message Player message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_init.IPlayer, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link dice.sc_battle_init.Player.verify|verify} messages.
             * @param message Player message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_init.IPlayer, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_init.Player;

            /**
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_init.Player;

            /**
             * Verifies a Player message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of an UpInfo. */
        interface IUpInfo {

            /** UpInfo id */
            id?: (string|null);

            /** UpInfo lv */
            lv?: (number|null);

            /** UpInfo pwlv */
            pwlv?: (number|null);
        }

        /** Represents an UpInfo. */
        class UpInfo implements IUpInfo {

            /**
             * Constructs a new UpInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_init.IUpInfo);

            /** UpInfo id. */
            public id: string;

            /** UpInfo lv. */
            public lv: number;

            /** UpInfo pwlv. */
            public pwlv: number;

            /**
             * Creates a new UpInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UpInfo instance
             */
            public static create(properties?: dice.sc_battle_init.IUpInfo): dice.sc_battle_init.UpInfo;

            /**
             * Encodes the specified UpInfo message. Does not implicitly {@link dice.sc_battle_init.UpInfo.verify|verify} messages.
             * @param message UpInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_init.IUpInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified UpInfo message, length delimited. Does not implicitly {@link dice.sc_battle_init.UpInfo.verify|verify} messages.
             * @param message UpInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_init.IUpInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an UpInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_init.UpInfo;

            /**
             * Decodes an UpInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UpInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_init.UpInfo;

            /**
             * Verifies an UpInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a cs_battle_sync. */
    interface Ics_battle_sync {

        /** cs_battle_sync frame */
        frame?: (number|null);

        /** cs_battle_sync rframe */
        rframe?: (number|null);

        /** cs_battle_sync checkValue */
        checkValue?: (string|null);

        /** cs_battle_sync checkframe */
        checkframe?: (number|null);
    }

    /** Represents a cs_battle_sync. */
    class cs_battle_sync implements Ics_battle_sync {

        /**
         * Constructs a new cs_battle_sync.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_sync);

        /** cs_battle_sync frame. */
        public frame: number;

        /** cs_battle_sync rframe. */
        public rframe: number;

        /** cs_battle_sync checkValue. */
        public checkValue: string;

        /** cs_battle_sync checkframe. */
        public checkframe: number;

        /**
         * Creates a new cs_battle_sync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_sync instance
         */
        public static create(properties?: dice.Ics_battle_sync): dice.cs_battle_sync;

        /**
         * Encodes the specified cs_battle_sync message. Does not implicitly {@link dice.cs_battle_sync.verify|verify} messages.
         * @param message cs_battle_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_sync message, length delimited. Does not implicitly {@link dice.cs_battle_sync.verify|verify} messages.
         * @param message cs_battle_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_sync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_sync;

        /**
         * Decodes a cs_battle_sync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_sync;

        /**
         * Verifies a cs_battle_sync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_sync. */
    interface Isc_battle_sync {

        /** sc_battle_sync syncOptData */
        syncOptData?: ({ [k: string]: dice.sc_battle_sync.ISyncOptData }|null);

        /** sc_battle_sync frame */
        frame?: (number|null);

        /** sc_battle_sync targetFrame */
        targetFrame?: (number|null);
    }

    /** Represents a sc_battle_sync. */
    class sc_battle_sync implements Isc_battle_sync {

        /**
         * Constructs a new sc_battle_sync.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_sync);

        /** sc_battle_sync syncOptData. */
        public syncOptData: { [k: string]: dice.sc_battle_sync.ISyncOptData };

        /** sc_battle_sync frame. */
        public frame: number;

        /** sc_battle_sync targetFrame. */
        public targetFrame: number;

        /**
         * Creates a new sc_battle_sync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_sync instance
         */
        public static create(properties?: dice.Isc_battle_sync): dice.sc_battle_sync;

        /**
         * Encodes the specified sc_battle_sync message. Does not implicitly {@link dice.sc_battle_sync.verify|verify} messages.
         * @param message sc_battle_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_sync message, length delimited. Does not implicitly {@link dice.sc_battle_sync.verify|verify} messages.
         * @param message sc_battle_sync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_sync, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_sync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_sync;

        /**
         * Decodes a sc_battle_sync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_sync;

        /**
         * Verifies a sc_battle_sync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_battle_sync {

        /** Properties of a SyncOptData. */
        interface ISyncOptData {

            /** SyncOptData opt */
            opt?: (dice.sc_battle_sync.IOpt[]|null);
        }

        /** Represents a SyncOptData. */
        class SyncOptData implements ISyncOptData {

            /**
             * Constructs a new SyncOptData.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_sync.ISyncOptData);

            /** SyncOptData opt. */
            public opt: dice.sc_battle_sync.IOpt[];

            /**
             * Creates a new SyncOptData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SyncOptData instance
             */
            public static create(properties?: dice.sc_battle_sync.ISyncOptData): dice.sc_battle_sync.SyncOptData;

            /**
             * Encodes the specified SyncOptData message. Does not implicitly {@link dice.sc_battle_sync.SyncOptData.verify|verify} messages.
             * @param message SyncOptData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_sync.ISyncOptData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified SyncOptData message, length delimited. Does not implicitly {@link dice.sc_battle_sync.SyncOptData.verify|verify} messages.
             * @param message SyncOptData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_sync.ISyncOptData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a SyncOptData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SyncOptData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_sync.SyncOptData;

            /**
             * Decodes a SyncOptData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SyncOptData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_sync.SyncOptData;

            /**
             * Verifies a SyncOptData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of an Opt. */
        interface IOpt {

            /** Opt optUid */
            optUid?: (number|null);

            /** Opt opt */
            opt?: (number|null);

            /** Opt fromPos */
            fromPos?: (string|null);

            /** Opt toPos */
            toPos?: (string|null);

            /** Opt upId */
            upId?: (string|null);

            /** Opt frame */
            frame?: (number|null);

            /** Opt optseed */
            optseed?: (number|null);
        }

        /** Represents an Opt. */
        class Opt implements IOpt {

            /**
             * Constructs a new Opt.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_sync.IOpt);

            /** Opt optUid. */
            public optUid: number;

            /** Opt opt. */
            public opt: number;

            /** Opt fromPos. */
            public fromPos: string;

            /** Opt toPos. */
            public toPos: string;

            /** Opt upId. */
            public upId: string;

            /** Opt frame. */
            public frame: number;

            /** Opt optseed. */
            public optseed: number;

            /**
             * Creates a new Opt instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Opt instance
             */
            public static create(properties?: dice.sc_battle_sync.IOpt): dice.sc_battle_sync.Opt;

            /**
             * Encodes the specified Opt message. Does not implicitly {@link dice.sc_battle_sync.Opt.verify|verify} messages.
             * @param message Opt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_sync.IOpt, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Opt message, length delimited. Does not implicitly {@link dice.sc_battle_sync.Opt.verify|verify} messages.
             * @param message Opt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_sync.IOpt, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an Opt message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Opt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_sync.Opt;

            /**
             * Decodes an Opt message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Opt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_sync.Opt;

            /**
             * Verifies an Opt message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a cs_battle_opt. */
    interface Ics_battle_opt {

        /** cs_battle_opt opt */
        opt?: (number|null);

        /** cs_battle_opt fromPos */
        fromPos?: (string|null);

        /** cs_battle_opt toPos */
        toPos?: (string|null);

        /** cs_battle_opt upId */
        upId?: (string|null);

        /** cs_battle_opt optseed */
        optseed?: (number|null);
    }

    /** Represents a cs_battle_opt. */
    class cs_battle_opt implements Ics_battle_opt {

        /**
         * Constructs a new cs_battle_opt.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_opt);

        /** cs_battle_opt opt. */
        public opt: number;

        /** cs_battle_opt fromPos. */
        public fromPos: string;

        /** cs_battle_opt toPos. */
        public toPos: string;

        /** cs_battle_opt upId. */
        public upId: string;

        /** cs_battle_opt optseed. */
        public optseed: number;

        /**
         * Creates a new cs_battle_opt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_opt instance
         */
        public static create(properties?: dice.Ics_battle_opt): dice.cs_battle_opt;

        /**
         * Encodes the specified cs_battle_opt message. Does not implicitly {@link dice.cs_battle_opt.verify|verify} messages.
         * @param message cs_battle_opt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_opt, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_opt message, length delimited. Does not implicitly {@link dice.cs_battle_opt.verify|verify} messages.
         * @param message cs_battle_opt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_opt, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_opt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_opt;

        /**
         * Decodes a cs_battle_opt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_opt;

        /**
         * Verifies a cs_battle_opt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_opt. */
    interface Isc_battle_opt {
    }

    /** Represents a sc_battle_opt. */
    class sc_battle_opt implements Isc_battle_opt {

        /**
         * Constructs a new sc_battle_opt.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_opt);

        /**
         * Creates a new sc_battle_opt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_opt instance
         */
        public static create(properties?: dice.Isc_battle_opt): dice.sc_battle_opt;

        /**
         * Encodes the specified sc_battle_opt message. Does not implicitly {@link dice.sc_battle_opt.verify|verify} messages.
         * @param message sc_battle_opt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_opt, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_opt message, length delimited. Does not implicitly {@link dice.sc_battle_opt.verify|verify} messages.
         * @param message sc_battle_opt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_opt, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_opt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_opt;

        /**
         * Decodes a sc_battle_opt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_opt;

        /**
         * Verifies a sc_battle_opt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_end. */
    interface Ics_battle_end {

        /** cs_battle_end turns */
        turns?: (number|null);

        /** cs_battle_end winFlag */
        winFlag?: (number|null);

        /** cs_battle_end star */
        star?: (number|null);

        /** cs_battle_end starArr */
        starArr?: ({ [k: string]: number }|null);
    }

    /** Represents a cs_battle_end. */
    class cs_battle_end implements Ics_battle_end {

        /**
         * Constructs a new cs_battle_end.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_end);

        /** cs_battle_end turns. */
        public turns: number;

        /** cs_battle_end winFlag. */
        public winFlag: number;

        /** cs_battle_end star. */
        public star: number;

        /** cs_battle_end starArr. */
        public starArr: { [k: string]: number };

        /**
         * Creates a new cs_battle_end instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_end instance
         */
        public static create(properties?: dice.Ics_battle_end): dice.cs_battle_end;

        /**
         * Encodes the specified cs_battle_end message. Does not implicitly {@link dice.cs_battle_end.verify|verify} messages.
         * @param message cs_battle_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_end message, length delimited. Does not implicitly {@link dice.cs_battle_end.verify|verify} messages.
         * @param message cs_battle_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_end message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_end;

        /**
         * Decodes a cs_battle_end message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_end;

        /**
         * Verifies a cs_battle_end message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_end. */
    interface Isc_battle_end {

        /** sc_battle_end rewardArr */
        rewardArr?: ({ [k: string]: dice.sc_battle_end.IRewardInfo }|null);
    }

    /** Represents a sc_battle_end. */
    class sc_battle_end implements Isc_battle_end {

        /**
         * Constructs a new sc_battle_end.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_end);

        /** sc_battle_end rewardArr. */
        public rewardArr: { [k: string]: dice.sc_battle_end.IRewardInfo };

        /**
         * Creates a new sc_battle_end instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_end instance
         */
        public static create(properties?: dice.Isc_battle_end): dice.sc_battle_end;

        /**
         * Encodes the specified sc_battle_end message. Does not implicitly {@link dice.sc_battle_end.verify|verify} messages.
         * @param message sc_battle_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_end message, length delimited. Does not implicitly {@link dice.sc_battle_end.verify|verify} messages.
         * @param message sc_battle_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_end message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_end;

        /**
         * Decodes a sc_battle_end message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_end;

        /**
         * Verifies a sc_battle_end message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace sc_battle_end {

        /** Properties of a RewardInfo. */
        interface IRewardInfo {

            /** RewardInfo score */
            score?: (number|null);

            /** RewardInfo gold */
            gold?: (number|null);

            /** RewardInfo gem */
            gem?: (number|null);

            /** RewardInfo winNum */
            winNum?: (number|null);
        }

        /** Represents a RewardInfo. */
        class RewardInfo implements IRewardInfo {

            /**
             * Constructs a new RewardInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.sc_battle_end.IRewardInfo);

            /** RewardInfo score. */
            public score: number;

            /** RewardInfo gold. */
            public gold: number;

            /** RewardInfo gem. */
            public gem: number;

            /** RewardInfo winNum. */
            public winNum: number;

            /**
             * Creates a new RewardInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RewardInfo instance
             */
            public static create(properties?: dice.sc_battle_end.IRewardInfo): dice.sc_battle_end.RewardInfo;

            /**
             * Encodes the specified RewardInfo message. Does not implicitly {@link dice.sc_battle_end.RewardInfo.verify|verify} messages.
             * @param message RewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.sc_battle_end.IRewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified RewardInfo message, length delimited. Does not implicitly {@link dice.sc_battle_end.RewardInfo.verify|verify} messages.
             * @param message RewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.sc_battle_end.IRewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a RewardInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_end.RewardInfo;

            /**
             * Decodes a RewardInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_end.RewardInfo;

            /**
             * Verifies a RewardInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a cs_battle_getLog. */
    interface Ics_battle_getLog {
    }

    /** Represents a cs_battle_getLog. */
    class cs_battle_getLog implements Ics_battle_getLog {

        /**
         * Constructs a new cs_battle_getLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_getLog);

        /**
         * Creates a new cs_battle_getLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_getLog instance
         */
        public static create(properties?: dice.Ics_battle_getLog): dice.cs_battle_getLog;

        /**
         * Encodes the specified cs_battle_getLog message. Does not implicitly {@link dice.cs_battle_getLog.verify|verify} messages.
         * @param message cs_battle_getLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_getLog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_getLog message, length delimited. Does not implicitly {@link dice.cs_battle_getLog.verify|verify} messages.
         * @param message cs_battle_getLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_getLog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_getLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_getLog;

        /**
         * Decodes a cs_battle_getLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_getLog;

        /**
         * Verifies a cs_battle_getLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_getLog. */
    interface Isc_battle_getLog {
    }

    /** Represents a sc_battle_getLog. */
    class sc_battle_getLog implements Isc_battle_getLog {

        /**
         * Constructs a new sc_battle_getLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_getLog);

        /**
         * Creates a new sc_battle_getLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_getLog instance
         */
        public static create(properties?: dice.Isc_battle_getLog): dice.sc_battle_getLog;

        /**
         * Encodes the specified sc_battle_getLog message. Does not implicitly {@link dice.sc_battle_getLog.verify|verify} messages.
         * @param message sc_battle_getLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_getLog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_getLog message, length delimited. Does not implicitly {@link dice.sc_battle_getLog.verify|verify} messages.
         * @param message sc_battle_getLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_getLog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_getLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_getLog;

        /**
         * Decodes a sc_battle_getLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_getLog;

        /**
         * Verifies a sc_battle_getLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_battle_complain. */
    interface Ics_battle_complain {

        /** cs_battle_complain logKey */
        logKey?: (number|null);
    }

    /** Represents a cs_battle_complain. */
    class cs_battle_complain implements Ics_battle_complain {

        /**
         * Constructs a new cs_battle_complain.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_battle_complain);

        /** cs_battle_complain logKey. */
        public logKey: number;

        /**
         * Creates a new cs_battle_complain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_battle_complain instance
         */
        public static create(properties?: dice.Ics_battle_complain): dice.cs_battle_complain;

        /**
         * Encodes the specified cs_battle_complain message. Does not implicitly {@link dice.cs_battle_complain.verify|verify} messages.
         * @param message cs_battle_complain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_battle_complain, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_battle_complain message, length delimited. Does not implicitly {@link dice.cs_battle_complain.verify|verify} messages.
         * @param message cs_battle_complain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_battle_complain, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_battle_complain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_battle_complain;

        /**
         * Decodes a cs_battle_complain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_battle_complain;

        /**
         * Verifies a cs_battle_complain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_battle_complain. */
    interface Isc_battle_complain {
    }

    /** Represents a sc_battle_complain. */
    class sc_battle_complain implements Isc_battle_complain {

        /**
         * Constructs a new sc_battle_complain.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_battle_complain);

        /**
         * Creates a new sc_battle_complain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_battle_complain instance
         */
        public static create(properties?: dice.Isc_battle_complain): dice.sc_battle_complain;

        /**
         * Encodes the specified sc_battle_complain message. Does not implicitly {@link dice.sc_battle_complain.verify|verify} messages.
         * @param message sc_battle_complain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_battle_complain, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_battle_complain message, length delimited. Does not implicitly {@link dice.sc_battle_complain.verify|verify} messages.
         * @param message sc_battle_complain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_battle_complain, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_battle_complain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_battle_complain;

        /**
         * Decodes a sc_battle_complain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_battle_complain;

        /**
         * Verifies a sc_battle_complain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_advertise_watch. */
    interface Ics_advertise_watch {

        /** cs_advertise_watch advType */
        advType?: (number|null);
    }

    /** Represents a cs_advertise_watch. */
    class cs_advertise_watch implements Ics_advertise_watch {

        /**
         * Constructs a new cs_advertise_watch.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_advertise_watch);

        /** cs_advertise_watch advType. */
        public advType: number;

        /**
         * Creates a new cs_advertise_watch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_advertise_watch instance
         */
        public static create(properties?: dice.Ics_advertise_watch): dice.cs_advertise_watch;

        /**
         * Encodes the specified cs_advertise_watch message. Does not implicitly {@link dice.cs_advertise_watch.verify|verify} messages.
         * @param message cs_advertise_watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_advertise_watch, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_advertise_watch message, length delimited. Does not implicitly {@link dice.cs_advertise_watch.verify|verify} messages.
         * @param message cs_advertise_watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_advertise_watch, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_advertise_watch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_advertise_watch;

        /**
         * Decodes a cs_advertise_watch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_advertise_watch;

        /**
         * Verifies a cs_advertise_watch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_advertise_watch. */
    interface Isc_advertise_watch {

        /** sc_advertise_watch rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_advertise_watch. */
    class sc_advertise_watch implements Isc_advertise_watch {

        /**
         * Constructs a new sc_advertise_watch.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_advertise_watch);

        /** sc_advertise_watch rewards. */
        public rewards: string;

        /**
         * Creates a new sc_advertise_watch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_advertise_watch instance
         */
        public static create(properties?: dice.Isc_advertise_watch): dice.sc_advertise_watch;

        /**
         * Encodes the specified sc_advertise_watch message. Does not implicitly {@link dice.sc_advertise_watch.verify|verify} messages.
         * @param message sc_advertise_watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_advertise_watch, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_advertise_watch message, length delimited. Does not implicitly {@link dice.sc_advertise_watch.verify|verify} messages.
         * @param message sc_advertise_watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_advertise_watch, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_advertise_watch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_advertise_watch;

        /**
         * Decodes a sc_advertise_watch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_advertise_watch;

        /**
         * Verifies a sc_advertise_watch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_fairArena_start. */
    interface Ics_fairArena_start {
    }

    /** Represents a cs_fairArena_start. */
    class cs_fairArena_start implements Ics_fairArena_start {

        /**
         * Constructs a new cs_fairArena_start.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_fairArena_start);

        /**
         * Creates a new cs_fairArena_start instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_fairArena_start instance
         */
        public static create(properties?: dice.Ics_fairArena_start): dice.cs_fairArena_start;

        /**
         * Encodes the specified cs_fairArena_start message. Does not implicitly {@link dice.cs_fairArena_start.verify|verify} messages.
         * @param message cs_fairArena_start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_fairArena_start, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_fairArena_start message, length delimited. Does not implicitly {@link dice.cs_fairArena_start.verify|verify} messages.
         * @param message cs_fairArena_start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_fairArena_start, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_fairArena_start message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_fairArena_start;

        /**
         * Decodes a cs_fairArena_start message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_fairArena_start;

        /**
         * Verifies a cs_fairArena_start message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_fairArena_start. */
    interface Isc_fairArena_start {
    }

    /** Represents a sc_fairArena_start. */
    class sc_fairArena_start implements Isc_fairArena_start {

        /**
         * Constructs a new sc_fairArena_start.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_fairArena_start);

        /**
         * Creates a new sc_fairArena_start instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_fairArena_start instance
         */
        public static create(properties?: dice.Isc_fairArena_start): dice.sc_fairArena_start;

        /**
         * Encodes the specified sc_fairArena_start message. Does not implicitly {@link dice.sc_fairArena_start.verify|verify} messages.
         * @param message sc_fairArena_start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_fairArena_start, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_fairArena_start message, length delimited. Does not implicitly {@link dice.sc_fairArena_start.verify|verify} messages.
         * @param message sc_fairArena_start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_fairArena_start, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_fairArena_start message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_fairArena_start;

        /**
         * Decodes a sc_fairArena_start message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_fairArena_start;

        /**
         * Verifies a sc_fairArena_start message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_fairArena_choose. */
    interface Ics_fairArena_choose {

        /** cs_fairArena_choose diceId */
        diceId?: (string|null);
    }

    /** Represents a cs_fairArena_choose. */
    class cs_fairArena_choose implements Ics_fairArena_choose {

        /**
         * Constructs a new cs_fairArena_choose.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_fairArena_choose);

        /** cs_fairArena_choose diceId. */
        public diceId: string;

        /**
         * Creates a new cs_fairArena_choose instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_fairArena_choose instance
         */
        public static create(properties?: dice.Ics_fairArena_choose): dice.cs_fairArena_choose;

        /**
         * Encodes the specified cs_fairArena_choose message. Does not implicitly {@link dice.cs_fairArena_choose.verify|verify} messages.
         * @param message cs_fairArena_choose message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_fairArena_choose, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_fairArena_choose message, length delimited. Does not implicitly {@link dice.cs_fairArena_choose.verify|verify} messages.
         * @param message cs_fairArena_choose message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_fairArena_choose, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_fairArena_choose message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_fairArena_choose;

        /**
         * Decodes a cs_fairArena_choose message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_fairArena_choose;

        /**
         * Verifies a cs_fairArena_choose message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_fairArena_choose. */
    interface Isc_fairArena_choose {
    }

    /** Represents a sc_fairArena_choose. */
    class sc_fairArena_choose implements Isc_fairArena_choose {

        /**
         * Constructs a new sc_fairArena_choose.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_fairArena_choose);

        /**
         * Creates a new sc_fairArena_choose instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_fairArena_choose instance
         */
        public static create(properties?: dice.Isc_fairArena_choose): dice.sc_fairArena_choose;

        /**
         * Encodes the specified sc_fairArena_choose message. Does not implicitly {@link dice.sc_fairArena_choose.verify|verify} messages.
         * @param message sc_fairArena_choose message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_fairArena_choose, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_fairArena_choose message, length delimited. Does not implicitly {@link dice.sc_fairArena_choose.verify|verify} messages.
         * @param message sc_fairArena_choose message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_fairArena_choose, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_fairArena_choose message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_fairArena_choose;

        /**
         * Decodes a sc_fairArena_choose message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_fairArena_choose;

        /**
         * Verifies a sc_fairArena_choose message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_fairArena_getReward. */
    interface Ics_fairArena_getReward {

        /** cs_fairArena_getReward key */
        key?: (string|null);
    }

    /** Represents a cs_fairArena_getReward. */
    class cs_fairArena_getReward implements Ics_fairArena_getReward {

        /**
         * Constructs a new cs_fairArena_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_fairArena_getReward);

        /** cs_fairArena_getReward key. */
        public key: string;

        /**
         * Creates a new cs_fairArena_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_fairArena_getReward instance
         */
        public static create(properties?: dice.Ics_fairArena_getReward): dice.cs_fairArena_getReward;

        /**
         * Encodes the specified cs_fairArena_getReward message. Does not implicitly {@link dice.cs_fairArena_getReward.verify|verify} messages.
         * @param message cs_fairArena_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_fairArena_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_fairArena_getReward message, length delimited. Does not implicitly {@link dice.cs_fairArena_getReward.verify|verify} messages.
         * @param message cs_fairArena_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_fairArena_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_fairArena_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_fairArena_getReward;

        /**
         * Decodes a cs_fairArena_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_fairArena_getReward;

        /**
         * Verifies a cs_fairArena_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_fairArena_getReward. */
    interface Isc_fairArena_getReward {

        /** sc_fairArena_getReward rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_fairArena_getReward. */
    class sc_fairArena_getReward implements Isc_fairArena_getReward {

        /**
         * Constructs a new sc_fairArena_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_fairArena_getReward);

        /** sc_fairArena_getReward rewards. */
        public rewards: string;

        /**
         * Creates a new sc_fairArena_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_fairArena_getReward instance
         */
        public static create(properties?: dice.Isc_fairArena_getReward): dice.sc_fairArena_getReward;

        /**
         * Encodes the specified sc_fairArena_getReward message. Does not implicitly {@link dice.sc_fairArena_getReward.verify|verify} messages.
         * @param message sc_fairArena_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_fairArena_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_fairArena_getReward message, length delimited. Does not implicitly {@link dice.sc_fairArena_getReward.verify|verify} messages.
         * @param message sc_fairArena_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_fairArena_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_fairArena_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_fairArena_getReward;

        /**
         * Decodes a sc_fairArena_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_fairArena_getReward;

        /**
         * Verifies a sc_fairArena_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_fairArena_end. */
    interface Ics_fairArena_end {
    }

    /** Represents a cs_fairArena_end. */
    class cs_fairArena_end implements Ics_fairArena_end {

        /**
         * Constructs a new cs_fairArena_end.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_fairArena_end);

        /**
         * Creates a new cs_fairArena_end instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_fairArena_end instance
         */
        public static create(properties?: dice.Ics_fairArena_end): dice.cs_fairArena_end;

        /**
         * Encodes the specified cs_fairArena_end message. Does not implicitly {@link dice.cs_fairArena_end.verify|verify} messages.
         * @param message cs_fairArena_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_fairArena_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_fairArena_end message, length delimited. Does not implicitly {@link dice.cs_fairArena_end.verify|verify} messages.
         * @param message cs_fairArena_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_fairArena_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_fairArena_end message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_fairArena_end;

        /**
         * Decodes a cs_fairArena_end message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_fairArena_end;

        /**
         * Verifies a cs_fairArena_end message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_fairArena_end. */
    interface Isc_fairArena_end {
    }

    /** Represents a sc_fairArena_end. */
    class sc_fairArena_end implements Isc_fairArena_end {

        /**
         * Constructs a new sc_fairArena_end.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_fairArena_end);

        /**
         * Creates a new sc_fairArena_end instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_fairArena_end instance
         */
        public static create(properties?: dice.Isc_fairArena_end): dice.sc_fairArena_end;

        /**
         * Encodes the specified sc_fairArena_end message. Does not implicitly {@link dice.sc_fairArena_end.verify|verify} messages.
         * @param message sc_fairArena_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_fairArena_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_fairArena_end message, length delimited. Does not implicitly {@link dice.sc_fairArena_end.verify|verify} messages.
         * @param message sc_fairArena_end message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_fairArena_end, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_fairArena_end message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_fairArena_end;

        /**
         * Decodes a sc_fairArena_end message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_fairArena_end;

        /**
         * Verifies a sc_fairArena_end message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_signinfo_sign. */
    interface Ics_signinfo_sign {
    }

    /** Represents a cs_signinfo_sign. */
    class cs_signinfo_sign implements Ics_signinfo_sign {

        /**
         * Constructs a new cs_signinfo_sign.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_signinfo_sign);

        /**
         * Creates a new cs_signinfo_sign instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_signinfo_sign instance
         */
        public static create(properties?: dice.Ics_signinfo_sign): dice.cs_signinfo_sign;

        /**
         * Encodes the specified cs_signinfo_sign message. Does not implicitly {@link dice.cs_signinfo_sign.verify|verify} messages.
         * @param message cs_signinfo_sign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_signinfo_sign, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_signinfo_sign message, length delimited. Does not implicitly {@link dice.cs_signinfo_sign.verify|verify} messages.
         * @param message cs_signinfo_sign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_signinfo_sign, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_signinfo_sign message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_signinfo_sign;

        /**
         * Decodes a cs_signinfo_sign message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_signinfo_sign;

        /**
         * Verifies a cs_signinfo_sign message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_signinfo_sign. */
    interface Isc_signinfo_sign {

        /** sc_signinfo_sign rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_signinfo_sign. */
    class sc_signinfo_sign implements Isc_signinfo_sign {

        /**
         * Constructs a new sc_signinfo_sign.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_signinfo_sign);

        /** sc_signinfo_sign rewards. */
        public rewards: string;

        /**
         * Creates a new sc_signinfo_sign instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_signinfo_sign instance
         */
        public static create(properties?: dice.Isc_signinfo_sign): dice.sc_signinfo_sign;

        /**
         * Encodes the specified sc_signinfo_sign message. Does not implicitly {@link dice.sc_signinfo_sign.verify|verify} messages.
         * @param message sc_signinfo_sign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_signinfo_sign, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_signinfo_sign message, length delimited. Does not implicitly {@link dice.sc_signinfo_sign.verify|verify} messages.
         * @param message sc_signinfo_sign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_signinfo_sign, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_signinfo_sign message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_signinfo_sign;

        /**
         * Decodes a sc_signinfo_sign message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_signinfo_sign;

        /**
         * Verifies a sc_signinfo_sign message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_signinfo_getFirstRecharge. */
    interface Ics_signinfo_getFirstRecharge {
    }

    /** Represents a cs_signinfo_getFirstRecharge. */
    class cs_signinfo_getFirstRecharge implements Ics_signinfo_getFirstRecharge {

        /**
         * Constructs a new cs_signinfo_getFirstRecharge.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_signinfo_getFirstRecharge);

        /**
         * Creates a new cs_signinfo_getFirstRecharge instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_signinfo_getFirstRecharge instance
         */
        public static create(properties?: dice.Ics_signinfo_getFirstRecharge): dice.cs_signinfo_getFirstRecharge;

        /**
         * Encodes the specified cs_signinfo_getFirstRecharge message. Does not implicitly {@link dice.cs_signinfo_getFirstRecharge.verify|verify} messages.
         * @param message cs_signinfo_getFirstRecharge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_signinfo_getFirstRecharge, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_signinfo_getFirstRecharge message, length delimited. Does not implicitly {@link dice.cs_signinfo_getFirstRecharge.verify|verify} messages.
         * @param message cs_signinfo_getFirstRecharge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_signinfo_getFirstRecharge, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_signinfo_getFirstRecharge message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_signinfo_getFirstRecharge;

        /**
         * Decodes a cs_signinfo_getFirstRecharge message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_signinfo_getFirstRecharge;

        /**
         * Verifies a cs_signinfo_getFirstRecharge message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_signinfo_getFirstRecharge. */
    interface Isc_signinfo_getFirstRecharge {

        /** sc_signinfo_getFirstRecharge rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_signinfo_getFirstRecharge. */
    class sc_signinfo_getFirstRecharge implements Isc_signinfo_getFirstRecharge {

        /**
         * Constructs a new sc_signinfo_getFirstRecharge.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_signinfo_getFirstRecharge);

        /** sc_signinfo_getFirstRecharge rewards. */
        public rewards: string;

        /**
         * Creates a new sc_signinfo_getFirstRecharge instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_signinfo_getFirstRecharge instance
         */
        public static create(properties?: dice.Isc_signinfo_getFirstRecharge): dice.sc_signinfo_getFirstRecharge;

        /**
         * Encodes the specified sc_signinfo_getFirstRecharge message. Does not implicitly {@link dice.sc_signinfo_getFirstRecharge.verify|verify} messages.
         * @param message sc_signinfo_getFirstRecharge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_signinfo_getFirstRecharge, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_signinfo_getFirstRecharge message, length delimited. Does not implicitly {@link dice.sc_signinfo_getFirstRecharge.verify|verify} messages.
         * @param message sc_signinfo_getFirstRecharge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_signinfo_getFirstRecharge, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_signinfo_getFirstRecharge message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_signinfo_getFirstRecharge;

        /**
         * Decodes a sc_signinfo_getFirstRecharge message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_signinfo_getFirstRecharge;

        /**
         * Verifies a sc_signinfo_getFirstRecharge message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_inviteFriend_bind. */
    interface Ics_inviteFriend_bind {

        /** cs_inviteFriend_bind bindCode */
        bindCode?: (string|null);
    }

    /** Represents a cs_inviteFriend_bind. */
    class cs_inviteFriend_bind implements Ics_inviteFriend_bind {

        /**
         * Constructs a new cs_inviteFriend_bind.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_inviteFriend_bind);

        /** cs_inviteFriend_bind bindCode. */
        public bindCode: string;

        /**
         * Creates a new cs_inviteFriend_bind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_inviteFriend_bind instance
         */
        public static create(properties?: dice.Ics_inviteFriend_bind): dice.cs_inviteFriend_bind;

        /**
         * Encodes the specified cs_inviteFriend_bind message. Does not implicitly {@link dice.cs_inviteFriend_bind.verify|verify} messages.
         * @param message cs_inviteFriend_bind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_inviteFriend_bind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_inviteFriend_bind message, length delimited. Does not implicitly {@link dice.cs_inviteFriend_bind.verify|verify} messages.
         * @param message cs_inviteFriend_bind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_inviteFriend_bind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_inviteFriend_bind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_inviteFriend_bind;

        /**
         * Decodes a cs_inviteFriend_bind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_inviteFriend_bind;

        /**
         * Verifies a cs_inviteFriend_bind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_inviteFriend_bind. */
    interface Isc_inviteFriend_bind {

        /** sc_inviteFriend_bind rewards */
        rewards?: (string|null);

        /** sc_inviteFriend_bind code */
        code?: (number|null);

        /** sc_inviteFriend_bind bindFlag */
        bindFlag?: (boolean|null);
    }

    /** Represents a sc_inviteFriend_bind. */
    class sc_inviteFriend_bind implements Isc_inviteFriend_bind {

        /**
         * Constructs a new sc_inviteFriend_bind.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_inviteFriend_bind);

        /** sc_inviteFriend_bind rewards. */
        public rewards: string;

        /** sc_inviteFriend_bind code. */
        public code: number;

        /** sc_inviteFriend_bind bindFlag. */
        public bindFlag: boolean;

        /**
         * Creates a new sc_inviteFriend_bind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_inviteFriend_bind instance
         */
        public static create(properties?: dice.Isc_inviteFriend_bind): dice.sc_inviteFriend_bind;

        /**
         * Encodes the specified sc_inviteFriend_bind message. Does not implicitly {@link dice.sc_inviteFriend_bind.verify|verify} messages.
         * @param message sc_inviteFriend_bind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_inviteFriend_bind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_inviteFriend_bind message, length delimited. Does not implicitly {@link dice.sc_inviteFriend_bind.verify|verify} messages.
         * @param message sc_inviteFriend_bind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_inviteFriend_bind, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_inviteFriend_bind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_inviteFriend_bind;

        /**
         * Decodes a sc_inviteFriend_bind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_inviteFriend_bind;

        /**
         * Verifies a sc_inviteFriend_bind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a cs_inviteFriend_getReward. */
    interface Ics_inviteFriend_getReward {

        /** cs_inviteFriend_getReward rkey */
        rkey?: (string|null);
    }

    /** Represents a cs_inviteFriend_getReward. */
    class cs_inviteFriend_getReward implements Ics_inviteFriend_getReward {

        /**
         * Constructs a new cs_inviteFriend_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Ics_inviteFriend_getReward);

        /** cs_inviteFriend_getReward rkey. */
        public rkey: string;

        /**
         * Creates a new cs_inviteFriend_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns cs_inviteFriend_getReward instance
         */
        public static create(properties?: dice.Ics_inviteFriend_getReward): dice.cs_inviteFriend_getReward;

        /**
         * Encodes the specified cs_inviteFriend_getReward message. Does not implicitly {@link dice.cs_inviteFriend_getReward.verify|verify} messages.
         * @param message cs_inviteFriend_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Ics_inviteFriend_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified cs_inviteFriend_getReward message, length delimited. Does not implicitly {@link dice.cs_inviteFriend_getReward.verify|verify} messages.
         * @param message cs_inviteFriend_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Ics_inviteFriend_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a cs_inviteFriend_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns cs_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.cs_inviteFriend_getReward;

        /**
         * Decodes a cs_inviteFriend_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns cs_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.cs_inviteFriend_getReward;

        /**
         * Verifies a cs_inviteFriend_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a sc_inviteFriend_getReward. */
    interface Isc_inviteFriend_getReward {

        /** sc_inviteFriend_getReward rewards */
        rewards?: (string|null);
    }

    /** Represents a sc_inviteFriend_getReward. */
    class sc_inviteFriend_getReward implements Isc_inviteFriend_getReward {

        /**
         * Constructs a new sc_inviteFriend_getReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Isc_inviteFriend_getReward);

        /** sc_inviteFriend_getReward rewards. */
        public rewards: string;

        /**
         * Creates a new sc_inviteFriend_getReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns sc_inviteFriend_getReward instance
         */
        public static create(properties?: dice.Isc_inviteFriend_getReward): dice.sc_inviteFriend_getReward;

        /**
         * Encodes the specified sc_inviteFriend_getReward message. Does not implicitly {@link dice.sc_inviteFriend_getReward.verify|verify} messages.
         * @param message sc_inviteFriend_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Isc_inviteFriend_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified sc_inviteFriend_getReward message, length delimited. Does not implicitly {@link dice.sc_inviteFriend_getReward.verify|verify} messages.
         * @param message sc_inviteFriend_getReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Isc_inviteFriend_getReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a sc_inviteFriend_getReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns sc_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.sc_inviteFriend_getReward;

        /**
         * Decodes a sc_inviteFriend_getReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns sc_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.sc_inviteFriend_getReward;

        /**
         * Verifies a sc_inviteFriend_getReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a model_userinfo. */
    interface Imodel_userinfo {

        /** model_userinfo uid */
        uid?: (number|null);

        /** model_userinfo name */
        name?: (string|null);

        /** model_userinfo mygid */
        mygid?: (number|null);

        /** model_userinfo mygname */
        mygname?: (string|null);

        /** model_userinfo level */
        level?: (number|null);

        /** model_userinfo score */
        score?: (number|null);

        /** model_userinfo maxscore */
        maxscore?: (number|null);

        /** model_userinfo gold */
        gold?: (number|null);

        /** model_userinfo gem */
        gem?: (number|null);

        /** model_userinfo card */
        card?: (number|null);

        /** model_userinfo win */
        win?: (number|null);

        /** model_userinfo lose */
        lose?: (number|null);

        /** model_userinfo sumb */
        sumb?: (number|null);

        /** model_userinfo maxturn */
        maxturn?: (number|null);

        /** model_userinfo buyg */
        buyg?: (number|null);

        /** model_userinfo buyt */
        buyt?: (number|null);

        /** model_userinfo buyn */
        buyn?: (number|null);

        /** model_userinfo freeg */
        freeg?: (number|null);
    }

    /** Represents a model_userinfo. */
    class model_userinfo implements Imodel_userinfo {

        /**
         * Constructs a new model_userinfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_userinfo);

        /** model_userinfo uid. */
        public uid: number;

        /** model_userinfo name. */
        public name: string;

        /** model_userinfo mygid. */
        public mygid: number;

        /** model_userinfo mygname. */
        public mygname: string;

        /** model_userinfo level. */
        public level: number;

        /** model_userinfo score. */
        public score: number;

        /** model_userinfo maxscore. */
        public maxscore: number;

        /** model_userinfo gold. */
        public gold: number;

        /** model_userinfo gem. */
        public gem: number;

        /** model_userinfo card. */
        public card: number;

        /** model_userinfo win. */
        public win: number;

        /** model_userinfo lose. */
        public lose: number;

        /** model_userinfo sumb. */
        public sumb: number;

        /** model_userinfo maxturn. */
        public maxturn: number;

        /** model_userinfo buyg. */
        public buyg: number;

        /** model_userinfo buyt. */
        public buyt: number;

        /** model_userinfo buyn. */
        public buyn: number;

        /** model_userinfo freeg. */
        public freeg: number;

        /**
         * Creates a new model_userinfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_userinfo instance
         */
        public static create(properties?: dice.Imodel_userinfo): dice.model_userinfo;

        /**
         * Encodes the specified model_userinfo message. Does not implicitly {@link dice.model_userinfo.verify|verify} messages.
         * @param message model_userinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_userinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_userinfo message, length delimited. Does not implicitly {@link dice.model_userinfo.verify|verify} messages.
         * @param message model_userinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_userinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_userinfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_userinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_userinfo;

        /**
         * Decodes a model_userinfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_userinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_userinfo;

        /**
         * Verifies a model_userinfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a model_dice. */
    interface Imodel_dice {

        /** model_dice info */
        info?: ({ [k: string]: dice.model_dice.IDiceInfo }|null);

        /** model_dice crivalue */
        crivalue?: (number|null);
    }

    /** Represents a model_dice. */
    class model_dice implements Imodel_dice {

        /**
         * Constructs a new model_dice.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_dice);

        /** model_dice info. */
        public info: { [k: string]: dice.model_dice.IDiceInfo };

        /** model_dice crivalue. */
        public crivalue: number;

        /**
         * Creates a new model_dice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_dice instance
         */
        public static create(properties?: dice.Imodel_dice): dice.model_dice;

        /**
         * Encodes the specified model_dice message. Does not implicitly {@link dice.model_dice.verify|verify} messages.
         * @param message model_dice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_dice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_dice message, length delimited. Does not implicitly {@link dice.model_dice.verify|verify} messages.
         * @param message model_dice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_dice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_dice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_dice;

        /**
         * Decodes a model_dice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_dice;

        /**
         * Verifies a model_dice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_dice {

        /** Properties of a DiceInfo. */
        interface IDiceInfo {

            /** DiceInfo lv */
            lv?: (number|null);

            /** DiceInfo num */
            num?: (number|null);
        }

        /** Represents a DiceInfo. */
        class DiceInfo implements IDiceInfo {

            /**
             * Constructs a new DiceInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_dice.IDiceInfo);

            /** DiceInfo lv. */
            public lv: number;

            /** DiceInfo num. */
            public num: number;

            /**
             * Creates a new DiceInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DiceInfo instance
             */
            public static create(properties?: dice.model_dice.IDiceInfo): dice.model_dice.DiceInfo;

            /**
             * Encodes the specified DiceInfo message. Does not implicitly {@link dice.model_dice.DiceInfo.verify|verify} messages.
             * @param message DiceInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_dice.IDiceInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified DiceInfo message, length delimited. Does not implicitly {@link dice.model_dice.DiceInfo.verify|verify} messages.
             * @param message DiceInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_dice.IDiceInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a DiceInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DiceInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_dice.DiceInfo;

            /**
             * Decodes a DiceInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DiceInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_dice.DiceInfo;

            /**
             * Verifies a DiceInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_line. */
    interface Imodel_line {

        /** model_line info1 */
        info1?: (dice.model_line.ILineModelInfo[]|null);

        /** model_line info2 */
        info2?: (dice.model_line.ILineModelInfo[]|null);

        /** model_line info3 */
        info3?: (dice.model_line.ILineModelInfo[]|null);

        /** model_line cur */
        cur?: (number|null);

        /** model_line scene */
        scene?: (string[]|null);

        /** model_line sid */
        sid?: (string|null);
    }

    /** Represents a model_line. */
    class model_line implements Imodel_line {

        /**
         * Constructs a new model_line.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_line);

        /** model_line info1. */
        public info1: dice.model_line.ILineModelInfo[];

        /** model_line info2. */
        public info2: dice.model_line.ILineModelInfo[];

        /** model_line info3. */
        public info3: dice.model_line.ILineModelInfo[];

        /** model_line cur. */
        public cur: number;

        /** model_line scene. */
        public scene: string[];

        /** model_line sid. */
        public sid: string;

        /**
         * Creates a new model_line instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_line instance
         */
        public static create(properties?: dice.Imodel_line): dice.model_line;

        /**
         * Encodes the specified model_line message. Does not implicitly {@link dice.model_line.verify|verify} messages.
         * @param message model_line message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_line, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_line message, length delimited. Does not implicitly {@link dice.model_line.verify|verify} messages.
         * @param message model_line message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_line, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_line message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_line
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_line;

        /**
         * Decodes a model_line message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_line
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_line;

        /**
         * Verifies a model_line message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_line {

        /** Properties of a LineModelInfo. */
        interface ILineModelInfo {

            /** LineModelInfo id */
            id?: (string|null);
        }

        /** Represents a LineModelInfo. */
        class LineModelInfo implements ILineModelInfo {

            /**
             * Constructs a new LineModelInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_line.ILineModelInfo);

            /** LineModelInfo id. */
            public id: string;

            /**
             * Creates a new LineModelInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LineModelInfo instance
             */
            public static create(properties?: dice.model_line.ILineModelInfo): dice.model_line.LineModelInfo;

            /**
             * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.model_line.LineModelInfo.verify|verify} messages.
             * @param message LineModelInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_line.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.model_line.LineModelInfo.verify|verify} messages.
             * @param message LineModelInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_line.ILineModelInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a LineModelInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LineModelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_line.LineModelInfo;

            /**
             * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LineModelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_line.LineModelInfo;

            /**
             * Verifies a LineModelInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_shop. */
    interface Imodel_shop {

        /** model_shop dailyshop */
        dailyshop?: ({ [k: string]: dice.model_shop.IDailyshop }|null);

        /** model_shop gift */
        gift?: (dice.model_shop.IGift|null);

        /** model_shop expression */
        expression?: ({ [k: string]: number }|null);

        /** model_shop lastday */
        lastday?: (number|null);
    }

    /** Represents a model_shop. */
    class model_shop implements Imodel_shop {

        /**
         * Constructs a new model_shop.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_shop);

        /** model_shop dailyshop. */
        public dailyshop: { [k: string]: dice.model_shop.IDailyshop };

        /** model_shop gift. */
        public gift?: (dice.model_shop.IGift|null);

        /** model_shop expression. */
        public expression: { [k: string]: number };

        /** model_shop lastday. */
        public lastday: number;

        /**
         * Creates a new model_shop instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_shop instance
         */
        public static create(properties?: dice.Imodel_shop): dice.model_shop;

        /**
         * Encodes the specified model_shop message. Does not implicitly {@link dice.model_shop.verify|verify} messages.
         * @param message model_shop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_shop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_shop message, length delimited. Does not implicitly {@link dice.model_shop.verify|verify} messages.
         * @param message model_shop message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_shop, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_shop message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_shop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_shop;

        /**
         * Decodes a model_shop message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_shop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_shop;

        /**
         * Verifies a model_shop message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_shop {

        /** Properties of a Dailyshop. */
        interface IDailyshop {

            /** Dailyshop id */
            id?: (number|null);

            /** Dailyshop num */
            num?: (number|null);

            /** Dailyshop hasBuy */
            hasBuy?: (number|null);

            /** Dailyshop diceId */
            diceId?: (string|null);
        }

        /** Represents a Dailyshop. */
        class Dailyshop implements IDailyshop {

            /**
             * Constructs a new Dailyshop.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_shop.IDailyshop);

            /** Dailyshop id. */
            public id: number;

            /** Dailyshop num. */
            public num: number;

            /** Dailyshop hasBuy. */
            public hasBuy: number;

            /** Dailyshop diceId. */
            public diceId: string;

            /**
             * Creates a new Dailyshop instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Dailyshop instance
             */
            public static create(properties?: dice.model_shop.IDailyshop): dice.model_shop.Dailyshop;

            /**
             * Encodes the specified Dailyshop message. Does not implicitly {@link dice.model_shop.Dailyshop.verify|verify} messages.
             * @param message Dailyshop message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_shop.IDailyshop, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Dailyshop message, length delimited. Does not implicitly {@link dice.model_shop.Dailyshop.verify|verify} messages.
             * @param message Dailyshop message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_shop.IDailyshop, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a Dailyshop message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Dailyshop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_shop.Dailyshop;

            /**
             * Decodes a Dailyshop message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Dailyshop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_shop.Dailyshop;

            /**
             * Verifies a Dailyshop message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a Gift. */
        interface IGift {

            /** Gift id */
            id?: (string|null);

            /** Gift hasBuy */
            hasBuy?: (number|null);
        }

        /** Represents a Gift. */
        class Gift implements IGift {

            /**
             * Constructs a new Gift.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_shop.IGift);

            /** Gift id. */
            public id: string;

            /** Gift hasBuy. */
            public hasBuy: number;

            /**
             * Creates a new Gift instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Gift instance
             */
            public static create(properties?: dice.model_shop.IGift): dice.model_shop.Gift;

            /**
             * Encodes the specified Gift message. Does not implicitly {@link dice.model_shop.Gift.verify|verify} messages.
             * @param message Gift message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_shop.IGift, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Gift message, length delimited. Does not implicitly {@link dice.model_shop.Gift.verify|verify} messages.
             * @param message Gift message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_shop.IGift, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a Gift message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Gift
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_shop.Gift;

            /**
             * Decodes a Gift message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Gift
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_shop.Gift;

            /**
             * Verifies a Gift message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_dailytask. */
    interface Imodel_dailytask {

        /** model_dailytask info */
        info?: (dice.model_dailytask.IDailyInfo|null);

        /** model_dailytask lastday */
        lastday?: (number|null);
    }

    /** Represents a model_dailytask. */
    class model_dailytask implements Imodel_dailytask {

        /**
         * Constructs a new model_dailytask.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_dailytask);

        /** model_dailytask info. */
        public info?: (dice.model_dailytask.IDailyInfo|null);

        /** model_dailytask lastday. */
        public lastday: number;

        /**
         * Creates a new model_dailytask instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_dailytask instance
         */
        public static create(properties?: dice.Imodel_dailytask): dice.model_dailytask;

        /**
         * Encodes the specified model_dailytask message. Does not implicitly {@link dice.model_dailytask.verify|verify} messages.
         * @param message model_dailytask message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_dailytask, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_dailytask message, length delimited. Does not implicitly {@link dice.model_dailytask.verify|verify} messages.
         * @param message model_dailytask message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_dailytask, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_dailytask message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_dailytask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_dailytask;

        /**
         * Decodes a model_dailytask message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_dailytask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_dailytask;

        /**
         * Verifies a model_dailytask message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_dailytask {

        /** Properties of a DailyInfo. */
        interface IDailyInfo {

            /** DailyInfo freeGet1 */
            freeGet1?: (number|null);

            /** DailyInfo freeGet2 */
            freeGet2?: (number|null);

            /** DailyInfo freeGet3 */
            freeGet3?: (number|null);

            /** DailyInfo taskInfo */
            taskInfo?: (dice.model_dailytask.ITaskInfo[]|null);

            /** DailyInfo freshFlag */
            freshFlag?: (number|null);
        }

        /** Represents a DailyInfo. */
        class DailyInfo implements IDailyInfo {

            /**
             * Constructs a new DailyInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_dailytask.IDailyInfo);

            /** DailyInfo freeGet1. */
            public freeGet1: number;

            /** DailyInfo freeGet2. */
            public freeGet2: number;

            /** DailyInfo freeGet3. */
            public freeGet3: number;

            /** DailyInfo taskInfo. */
            public taskInfo: dice.model_dailytask.ITaskInfo[];

            /** DailyInfo freshFlag. */
            public freshFlag: number;

            /**
             * Creates a new DailyInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DailyInfo instance
             */
            public static create(properties?: dice.model_dailytask.IDailyInfo): dice.model_dailytask.DailyInfo;

            /**
             * Encodes the specified DailyInfo message. Does not implicitly {@link dice.model_dailytask.DailyInfo.verify|verify} messages.
             * @param message DailyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_dailytask.IDailyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified DailyInfo message, length delimited. Does not implicitly {@link dice.model_dailytask.DailyInfo.verify|verify} messages.
             * @param message DailyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_dailytask.IDailyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a DailyInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DailyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_dailytask.DailyInfo;

            /**
             * Decodes a DailyInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DailyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_dailytask.DailyInfo;

            /**
             * Verifies a DailyInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a TaskInfo. */
        interface ITaskInfo {

            /** TaskInfo id */
            id?: (string|null);

            /** TaskInfo v */
            v?: (number|null);

            /** TaskInfo f */
            f?: (number|null);
        }

        /** Represents a TaskInfo. */
        class TaskInfo implements ITaskInfo {

            /**
             * Constructs a new TaskInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_dailytask.ITaskInfo);

            /** TaskInfo id. */
            public id: string;

            /** TaskInfo v. */
            public v: number;

            /** TaskInfo f. */
            public f: number;

            /**
             * Creates a new TaskInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TaskInfo instance
             */
            public static create(properties?: dice.model_dailytask.ITaskInfo): dice.model_dailytask.TaskInfo;

            /**
             * Encodes the specified TaskInfo message. Does not implicitly {@link dice.model_dailytask.TaskInfo.verify|verify} messages.
             * @param message TaskInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_dailytask.ITaskInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified TaskInfo message, length delimited. Does not implicitly {@link dice.model_dailytask.TaskInfo.verify|verify} messages.
             * @param message TaskInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_dailytask.ITaskInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a TaskInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_dailytask.TaskInfo;

            /**
             * Decodes a TaskInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_dailytask.TaskInfo;

            /**
             * Verifies a TaskInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_gameinfo. */
    interface Imodel_gameinfo {

        /** model_gameinfo jvip */
        jvip?: (number|null);

        /** model_gameinfo svip */
        svip?: (number|null);

        /** model_gameinfo royalPass */
        royalPass?: ({ [k: string]: dice.model_gameinfo.IRoyalPass }|null);

        /** model_gameinfo jnum */
        jnum?: (number|null);

        /** model_gameinfo gnum */
        gnum?: (number|null);

        /** model_gameinfo buynum */
        buynum?: (number|null);

        /** model_gameinfo zengfu */
        zengfu?: (number|null);

        /** model_gameinfo newerGuild */
        newerGuild?: (number|null);

        /** model_gameinfo stepGuild */
        stepGuild?: ({ [k: string]: number }|null);

        /** model_gameinfo lastday */
        lastday?: (number|null);
    }

    /** Represents a model_gameinfo. */
    class model_gameinfo implements Imodel_gameinfo {

        /**
         * Constructs a new model_gameinfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_gameinfo);

        /** model_gameinfo jvip. */
        public jvip: number;

        /** model_gameinfo svip. */
        public svip: number;

        /** model_gameinfo royalPass. */
        public royalPass: { [k: string]: dice.model_gameinfo.IRoyalPass };

        /** model_gameinfo jnum. */
        public jnum: number;

        /** model_gameinfo gnum. */
        public gnum: number;

        /** model_gameinfo buynum. */
        public buynum: number;

        /** model_gameinfo zengfu. */
        public zengfu: number;

        /** model_gameinfo newerGuild. */
        public newerGuild: number;

        /** model_gameinfo stepGuild. */
        public stepGuild: { [k: string]: number };

        /** model_gameinfo lastday. */
        public lastday: number;

        /**
         * Creates a new model_gameinfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_gameinfo instance
         */
        public static create(properties?: dice.Imodel_gameinfo): dice.model_gameinfo;

        /**
         * Encodes the specified model_gameinfo message. Does not implicitly {@link dice.model_gameinfo.verify|verify} messages.
         * @param message model_gameinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_gameinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_gameinfo message, length delimited. Does not implicitly {@link dice.model_gameinfo.verify|verify} messages.
         * @param message model_gameinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_gameinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_gameinfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_gameinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_gameinfo;

        /**
         * Decodes a model_gameinfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_gameinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_gameinfo;

        /**
         * Verifies a model_gameinfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_gameinfo {

        /** Properties of a RoyalPass. */
        interface IRoyalPass {

            /** RoyalPass primary */
            primary?: (number|null);

            /** RoyalPass advanced */
            advanced?: (number|null);
        }

        /** Represents a RoyalPass. */
        class RoyalPass implements IRoyalPass {

            /**
             * Constructs a new RoyalPass.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_gameinfo.IRoyalPass);

            /** RoyalPass primary. */
            public primary: number;

            /** RoyalPass advanced. */
            public advanced: number;

            /**
             * Creates a new RoyalPass instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RoyalPass instance
             */
            public static create(properties?: dice.model_gameinfo.IRoyalPass): dice.model_gameinfo.RoyalPass;

            /**
             * Encodes the specified RoyalPass message. Does not implicitly {@link dice.model_gameinfo.RoyalPass.verify|verify} messages.
             * @param message RoyalPass message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_gameinfo.IRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified RoyalPass message, length delimited. Does not implicitly {@link dice.model_gameinfo.RoyalPass.verify|verify} messages.
             * @param message RoyalPass message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_gameinfo.IRoyalPass, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a RoyalPass message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RoyalPass
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_gameinfo.RoyalPass;

            /**
             * Decodes a RoyalPass message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RoyalPass
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_gameinfo.RoyalPass;

            /**
             * Verifies a RoyalPass message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_mymail. */
    interface Imodel_mymail {

        /** model_mymail system */
        system?: ({ [k: string]: dice.model_mymail.ISystemData }|null);

        /** model_mymail checkts */
        checkts?: (number|Long|null);
    }

    /** Represents a model_mymail. */
    class model_mymail implements Imodel_mymail {

        /**
         * Constructs a new model_mymail.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_mymail);

        /** model_mymail system. */
        public system: { [k: string]: dice.model_mymail.ISystemData };

        /** model_mymail checkts. */
        public checkts: (number|Long);

        /**
         * Creates a new model_mymail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_mymail instance
         */
        public static create(properties?: dice.Imodel_mymail): dice.model_mymail;

        /**
         * Encodes the specified model_mymail message. Does not implicitly {@link dice.model_mymail.verify|verify} messages.
         * @param message model_mymail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_mymail, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_mymail message, length delimited. Does not implicitly {@link dice.model_mymail.verify|verify} messages.
         * @param message model_mymail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_mymail, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_mymail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_mymail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_mymail;

        /**
         * Decodes a model_mymail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_mymail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_mymail;

        /**
         * Verifies a model_mymail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_mymail {

        /** Properties of a SystemData. */
        interface ISystemData {

            /** SystemData id */
            id?: (number|null);

            /** SystemData title */
            title?: (string|null);

            /** SystemData content */
            content?: (string|null);

            /** SystemData ts */
            ts?: (number|null);

            /** SystemData rewards */
            rewards?: (string|null);

            /** SystemData isread */
            isread?: (number|null);
        }

        /** Represents a SystemData. */
        class SystemData implements ISystemData {

            /**
             * Constructs a new SystemData.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_mymail.ISystemData);

            /** SystemData id. */
            public id: number;

            /** SystemData title. */
            public title: string;

            /** SystemData content. */
            public content: string;

            /** SystemData ts. */
            public ts: number;

            /** SystemData rewards. */
            public rewards: string;

            /** SystemData isread. */
            public isread: number;

            /**
             * Creates a new SystemData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SystemData instance
             */
            public static create(properties?: dice.model_mymail.ISystemData): dice.model_mymail.SystemData;

            /**
             * Encodes the specified SystemData message. Does not implicitly {@link dice.model_mymail.SystemData.verify|verify} messages.
             * @param message SystemData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_mymail.ISystemData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified SystemData message, length delimited. Does not implicitly {@link dice.model_mymail.SystemData.verify|verify} messages.
             * @param message SystemData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_mymail.ISystemData, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a SystemData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SystemData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_mymail.SystemData;

            /**
             * Decodes a SystemData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SystemData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_mymail.SystemData;

            /**
             * Verifies a SystemData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_battlelog. */
    interface Imodel_battlelog {

        /** model_battlelog info */
        info?: (dice.model_battlelog.IBattleLogInfo[]|null);
    }

    /** Represents a model_battlelog. */
    class model_battlelog implements Imodel_battlelog {

        /**
         * Constructs a new model_battlelog.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_battlelog);

        /** model_battlelog info. */
        public info: dice.model_battlelog.IBattleLogInfo[];

        /**
         * Creates a new model_battlelog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_battlelog instance
         */
        public static create(properties?: dice.Imodel_battlelog): dice.model_battlelog;

        /**
         * Encodes the specified model_battlelog message. Does not implicitly {@link dice.model_battlelog.verify|verify} messages.
         * @param message model_battlelog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_battlelog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_battlelog message, length delimited. Does not implicitly {@link dice.model_battlelog.verify|verify} messages.
         * @param message model_battlelog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_battlelog, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_battlelog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_battlelog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_battlelog;

        /**
         * Decodes a model_battlelog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_battlelog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_battlelog;

        /**
         * Verifies a model_battlelog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_battlelog {

        /** Properties of a BattleLogInfo. */
        interface IBattleLogInfo {

            /** BattleLogInfo battleType */
            battleType?: (number|null);

            /** BattleLogInfo changeScore */
            changeScore?: (number|null);

            /** BattleLogInfo turns */
            turns?: (number|null);

            /** BattleLogInfo winFlag */
            winFlag?: (number|null);

            /** BattleLogInfo uid */
            uid?: (number|null);

            /** BattleLogInfo level */
            level?: (number|null);

            /** BattleLogInfo name */
            name?: (string|null);

            /** BattleLogInfo score */
            score?: (number|null);

            /** BattleLogInfo complain */
            complain?: (number|null);

            /** BattleLogInfo line */
            line?: (dice.model_battlelog.BattleLogInfo.IlineInfo[]|null);
        }

        /** Represents a BattleLogInfo. */
        class BattleLogInfo implements IBattleLogInfo {

            /**
             * Constructs a new BattleLogInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_battlelog.IBattleLogInfo);

            /** BattleLogInfo battleType. */
            public battleType: number;

            /** BattleLogInfo changeScore. */
            public changeScore: number;

            /** BattleLogInfo turns. */
            public turns: number;

            /** BattleLogInfo winFlag. */
            public winFlag: number;

            /** BattleLogInfo uid. */
            public uid: number;

            /** BattleLogInfo level. */
            public level: number;

            /** BattleLogInfo name. */
            public name: string;

            /** BattleLogInfo score. */
            public score: number;

            /** BattleLogInfo complain. */
            public complain: number;

            /** BattleLogInfo line. */
            public line: dice.model_battlelog.BattleLogInfo.IlineInfo[];

            /**
             * Creates a new BattleLogInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BattleLogInfo instance
             */
            public static create(properties?: dice.model_battlelog.IBattleLogInfo): dice.model_battlelog.BattleLogInfo;

            /**
             * Encodes the specified BattleLogInfo message. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.verify|verify} messages.
             * @param message BattleLogInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_battlelog.IBattleLogInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified BattleLogInfo message, length delimited. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.verify|verify} messages.
             * @param message BattleLogInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_battlelog.IBattleLogInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a BattleLogInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BattleLogInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_battlelog.BattleLogInfo;

            /**
             * Decodes a BattleLogInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BattleLogInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_battlelog.BattleLogInfo;

            /**
             * Verifies a BattleLogInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        namespace BattleLogInfo {

            /** Properties of a lineInfo. */
            interface IlineInfo {

                /** lineInfo id */
                id?: (string|null);
            }

            /** Represents a lineInfo. */
            class lineInfo implements IlineInfo {

                /**
                 * Constructs a new lineInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dice.model_battlelog.BattleLogInfo.IlineInfo);

                /** lineInfo id. */
                public id: string;

                /**
                 * Creates a new lineInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns lineInfo instance
                 */
                public static create(properties?: dice.model_battlelog.BattleLogInfo.IlineInfo): dice.model_battlelog.BattleLogInfo.lineInfo;

                /**
                 * Encodes the specified lineInfo message. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.lineInfo.verify|verify} messages.
                 * @param message lineInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dice.model_battlelog.BattleLogInfo.IlineInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Encodes the specified lineInfo message, length delimited. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.lineInfo.verify|verify} messages.
                 * @param message lineInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dice.model_battlelog.BattleLogInfo.IlineInfo, writer?: protobuf.Writer): protobuf.Writer;

                /**
                 * Decodes a lineInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns lineInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_battlelog.BattleLogInfo.lineInfo;

                /**
                 * Decodes a lineInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns lineInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_battlelog.BattleLogInfo.lineInfo;

                /**
                 * Verifies a lineInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);
            }
        }
    }

    /** Properties of a model_advertise. */
    interface Imodel_advertise {

        /** model_advertise info */
        info?: ({ [k: string]: dice.model_advertise.IadvInfo }|null);

        /** model_advertise lastday */
        lastday?: (number|null);
    }

    /** Represents a model_advertise. */
    class model_advertise implements Imodel_advertise {

        /**
         * Constructs a new model_advertise.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_advertise);

        /** model_advertise info. */
        public info: { [k: string]: dice.model_advertise.IadvInfo };

        /** model_advertise lastday. */
        public lastday: number;

        /**
         * Creates a new model_advertise instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_advertise instance
         */
        public static create(properties?: dice.Imodel_advertise): dice.model_advertise;

        /**
         * Encodes the specified model_advertise message. Does not implicitly {@link dice.model_advertise.verify|verify} messages.
         * @param message model_advertise message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_advertise, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_advertise message, length delimited. Does not implicitly {@link dice.model_advertise.verify|verify} messages.
         * @param message model_advertise message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_advertise, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_advertise message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_advertise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_advertise;

        /**
         * Decodes a model_advertise message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_advertise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_advertise;

        /**
         * Verifies a model_advertise message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_advertise {

        /** Properties of an advInfo. */
        interface IadvInfo {

            /** advInfo st */
            st?: (number|null);

            /** advInfo num */
            num?: (number|null);
        }

        /** Represents an advInfo. */
        class advInfo implements IadvInfo {

            /**
             * Constructs a new advInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_advertise.IadvInfo);

            /** advInfo st. */
            public st: number;

            /** advInfo num. */
            public num: number;

            /**
             * Creates a new advInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns advInfo instance
             */
            public static create(properties?: dice.model_advertise.IadvInfo): dice.model_advertise.advInfo;

            /**
             * Encodes the specified advInfo message. Does not implicitly {@link dice.model_advertise.advInfo.verify|verify} messages.
             * @param message advInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_advertise.IadvInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified advInfo message, length delimited. Does not implicitly {@link dice.model_advertise.advInfo.verify|verify} messages.
             * @param message advInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_advertise.IadvInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an advInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns advInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_advertise.advInfo;

            /**
             * Decodes an advInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns advInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_advertise.advInfo;

            /**
             * Verifies an advInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_fairArena. */
    interface Imodel_fairArena {

        /** model_fairArena status */
        status?: (number|null);

        /** model_fairArena winNum */
        winNum?: (number|null);

        /** model_fairArena loseNum */
        loseNum?: (number|null);

        /** model_fairArena line */
        line?: (dice.model_fairArena.IlineInfo[]|null);

        /** model_fairArena pool */
        pool?: ({ [k: string]: dice.model_fairArena.IPoolInfo }|null);

        /** model_fairArena rewards */
        rewards?: ({ [k: string]: number }|null);
    }

    /** Represents a model_fairArena. */
    class model_fairArena implements Imodel_fairArena {

        /**
         * Constructs a new model_fairArena.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_fairArena);

        /** model_fairArena status. */
        public status: number;

        /** model_fairArena winNum. */
        public winNum: number;

        /** model_fairArena loseNum. */
        public loseNum: number;

        /** model_fairArena line. */
        public line: dice.model_fairArena.IlineInfo[];

        /** model_fairArena pool. */
        public pool: { [k: string]: dice.model_fairArena.IPoolInfo };

        /** model_fairArena rewards. */
        public rewards: { [k: string]: number };

        /**
         * Creates a new model_fairArena instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_fairArena instance
         */
        public static create(properties?: dice.Imodel_fairArena): dice.model_fairArena;

        /**
         * Encodes the specified model_fairArena message. Does not implicitly {@link dice.model_fairArena.verify|verify} messages.
         * @param message model_fairArena message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_fairArena, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_fairArena message, length delimited. Does not implicitly {@link dice.model_fairArena.verify|verify} messages.
         * @param message model_fairArena message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_fairArena, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_fairArena message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_fairArena
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_fairArena;

        /**
         * Decodes a model_fairArena message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_fairArena
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_fairArena;

        /**
         * Verifies a model_fairArena message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_fairArena {

        /** Properties of a lineInfo. */
        interface IlineInfo {

            /** lineInfo id */
            id?: (string|null);
        }

        /** Represents a lineInfo. */
        class lineInfo implements IlineInfo {

            /**
             * Constructs a new lineInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_fairArena.IlineInfo);

            /** lineInfo id. */
            public id: string;

            /**
             * Creates a new lineInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns lineInfo instance
             */
            public static create(properties?: dice.model_fairArena.IlineInfo): dice.model_fairArena.lineInfo;

            /**
             * Encodes the specified lineInfo message. Does not implicitly {@link dice.model_fairArena.lineInfo.verify|verify} messages.
             * @param message lineInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_fairArena.IlineInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified lineInfo message, length delimited. Does not implicitly {@link dice.model_fairArena.lineInfo.verify|verify} messages.
             * @param message lineInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_fairArena.IlineInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a lineInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns lineInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_fairArena.lineInfo;

            /**
             * Decodes a lineInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns lineInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_fairArena.lineInfo;

            /**
             * Verifies a lineInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a PoolInfo. */
        interface IPoolInfo {

            /** PoolInfo list */
            list?: (string[]|null);
        }

        /** Represents a PoolInfo. */
        class PoolInfo implements IPoolInfo {

            /**
             * Constructs a new PoolInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_fairArena.IPoolInfo);

            /** PoolInfo list. */
            public list: string[];

            /**
             * Creates a new PoolInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PoolInfo instance
             */
            public static create(properties?: dice.model_fairArena.IPoolInfo): dice.model_fairArena.PoolInfo;

            /**
             * Encodes the specified PoolInfo message. Does not implicitly {@link dice.model_fairArena.PoolInfo.verify|verify} messages.
             * @param message PoolInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_fairArena.IPoolInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified PoolInfo message, length delimited. Does not implicitly {@link dice.model_fairArena.PoolInfo.verify|verify} messages.
             * @param message PoolInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_fairArena.IPoolInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a PoolInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PoolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_fairArena.PoolInfo;

            /**
             * Decodes a PoolInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PoolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_fairArena.PoolInfo;

            /**
             * Verifies a PoolInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }

    /** Properties of a model_signinfo. */
    interface Imodel_signinfo {

        /** model_signinfo info */
        info?: ({ [k: string]: number }|null);

        /** model_signinfo days */
        days?: (number|null);

        /** model_signinfo hasSign */
        hasSign?: (number|null);

        /** model_signinfo renameNum */
        renameNum?: (number|null);

        /** model_signinfo payFlag */
        payFlag?: (number|null);

        /** model_signinfo lastday */
        lastday?: (number|null);
    }

    /** Represents a model_signinfo. */
    class model_signinfo implements Imodel_signinfo {

        /**
         * Constructs a new model_signinfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_signinfo);

        /** model_signinfo info. */
        public info: { [k: string]: number };

        /** model_signinfo days. */
        public days: number;

        /** model_signinfo hasSign. */
        public hasSign: number;

        /** model_signinfo renameNum. */
        public renameNum: number;

        /** model_signinfo payFlag. */
        public payFlag: number;

        /** model_signinfo lastday. */
        public lastday: number;

        /**
         * Creates a new model_signinfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_signinfo instance
         */
        public static create(properties?: dice.Imodel_signinfo): dice.model_signinfo;

        /**
         * Encodes the specified model_signinfo message. Does not implicitly {@link dice.model_signinfo.verify|verify} messages.
         * @param message model_signinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_signinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_signinfo message, length delimited. Does not implicitly {@link dice.model_signinfo.verify|verify} messages.
         * @param message model_signinfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_signinfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_signinfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_signinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_signinfo;

        /**
         * Decodes a model_signinfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_signinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_signinfo;

        /**
         * Verifies a model_signinfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a model_inviteFriend. */
    interface Imodel_inviteFriend {

        /** model_inviteFriend code */
        code?: (string|null);

        /** model_inviteFriend score */
        score?: (number|null);

        /** model_inviteFriend iscore */
        iscore?: (number|null);

        /** model_inviteFriend rinfo */
        rinfo?: ({ [k: string]: number }|null);

        /** model_inviteFriend iuid */
        iuid?: (number|null);
    }

    /** Represents a model_inviteFriend. */
    class model_inviteFriend implements Imodel_inviteFriend {

        /**
         * Constructs a new model_inviteFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_inviteFriend);

        /** model_inviteFriend code. */
        public code: string;

        /** model_inviteFriend score. */
        public score: number;

        /** model_inviteFriend iscore. */
        public iscore: number;

        /** model_inviteFriend rinfo. */
        public rinfo: { [k: string]: number };

        /** model_inviteFriend iuid. */
        public iuid: number;

        /**
         * Creates a new model_inviteFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_inviteFriend instance
         */
        public static create(properties?: dice.Imodel_inviteFriend): dice.model_inviteFriend;

        /**
         * Encodes the specified model_inviteFriend message. Does not implicitly {@link dice.model_inviteFriend.verify|verify} messages.
         * @param message model_inviteFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_inviteFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_inviteFriend message, length delimited. Does not implicitly {@link dice.model_inviteFriend.verify|verify} messages.
         * @param message model_inviteFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_inviteFriend, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_inviteFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_inviteFriend;

        /**
         * Decodes a model_inviteFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_inviteFriend;

        /**
         * Verifies a model_inviteFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a model_achievement. */
    interface Imodel_achievement {

        /** model_achievement info */
        info?: ({ [k: string]: dice.model_achievement.IAchinfo }|null);
    }

    /** Represents a model_achievement. */
    class model_achievement implements Imodel_achievement {

        /**
         * Constructs a new model_achievement.
         * @param [properties] Properties to set
         */
        constructor(properties?: dice.Imodel_achievement);

        /** model_achievement info. */
        public info: { [k: string]: dice.model_achievement.IAchinfo };

        /**
         * Creates a new model_achievement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns model_achievement instance
         */
        public static create(properties?: dice.Imodel_achievement): dice.model_achievement;

        /**
         * Encodes the specified model_achievement message. Does not implicitly {@link dice.model_achievement.verify|verify} messages.
         * @param message model_achievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dice.Imodel_achievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified model_achievement message, length delimited. Does not implicitly {@link dice.model_achievement.verify|verify} messages.
         * @param message model_achievement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dice.Imodel_achievement, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a model_achievement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns model_achievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_achievement;

        /**
         * Decodes a model_achievement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns model_achievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_achievement;

        /**
         * Verifies a model_achievement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace model_achievement {

        /** Properties of an Achinfo. */
        interface IAchinfo {

            /** Achinfo stage */
            stage?: (number|null);

            /** Achinfo v */
            v?: (number|null);

            /** Achinfo f */
            f?: (number|null);
        }

        /** Represents an Achinfo. */
        class Achinfo implements IAchinfo {

            /**
             * Constructs a new Achinfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: dice.model_achievement.IAchinfo);

            /** Achinfo stage. */
            public stage: number;

            /** Achinfo v. */
            public v: number;

            /** Achinfo f. */
            public f: number;

            /**
             * Creates a new Achinfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Achinfo instance
             */
            public static create(properties?: dice.model_achievement.IAchinfo): dice.model_achievement.Achinfo;

            /**
             * Encodes the specified Achinfo message. Does not implicitly {@link dice.model_achievement.Achinfo.verify|verify} messages.
             * @param message Achinfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dice.model_achievement.IAchinfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified Achinfo message, length delimited. Does not implicitly {@link dice.model_achievement.Achinfo.verify|verify} messages.
             * @param message Achinfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dice.model_achievement.IAchinfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an Achinfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Achinfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): dice.model_achievement.Achinfo;

            /**
             * Decodes an Achinfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Achinfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): dice.model_achievement.Achinfo;

            /**
             * Verifies an Achinfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }
}
