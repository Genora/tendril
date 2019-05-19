import { raise } from '@quenk/noni/lib/control/monad/future';
import { Disable, Enable, Redirect } from '../../../../../src/app/module';
import { await } from '../../../../../src/app/api/action/control';
import { ActionM } from '../../../../../src/app/api/action';
import { Request } from '../../../../../src/app/api/request';
import { ok } from '../../../../../src/app/api/action/response';
import { header } from '../../../../../src/app/api/action/response';
import { Response, ask, tell }
    from '../../../../../src/app/api/action/control/actor';

export const disable = (_: Request): ActionM<undefined> =>
    (tell('/accounts', new Disable())
        .chain(() => ok()));

export const enable = (_: Request): ActionM<undefined> =>
    (tell('/accounts', new Enable())
        .chain(() => ok()));

export const redirect = (_: Request): ActionM<undefined> =>
    (tell('/accounts', new Redirect(301, 'localhost:8888'))
        .chain(() => ok()));

export const ping = (_: Request): ActionM<undefined> =>
    (ask<Response<string>>('/pong', 'ping').chain(r => ok(r)));

export const xheaders = (_: Request): ActionM<undefined> =>
    header({
        'x-powered-by': 'Thanos',
        'x-men': 'wolverine;storm;roll',
        'x-mega': 'zero'
    })
        .chain(() => ok());

export const crash = (_: Request): ActionM<undefined> =>
    await(() => raise(Error('crashed!')));
