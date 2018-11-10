import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { Disable, Enable, Redirect } from '../../../../../src/app/module';
import { ActionM, Request, tell } from '../../../../../src/app/api';
import { ok } from '../../../../../src/app/api/http';

export const disable = (_: Request): Future<ActionM<undefined>> =>
    pure(tell('/accounts', new Disable())
        .chain(() => ok()));

export const enable = (_: Request): Future<ActionM<undefined>> =>
    pure(tell('/accounts', new Enable())
        .chain(() => ok()));

export const redirect = (_: Request): Future<ActionM<undefined>> =>
    pure(tell('/accounts', new Redirect(301, 'localhost:8888'))
        .chain(() => ok()));