import * as pool from '../../../../../src/app/api/action/pool';
import { Object } from '@quenk/noni/lib/data/json';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Request } from '../../../../../src/app/api/request';
import { ActionM } from '../../../../../src/app/api/action';
import { await, value, next } from '../../../../../src/app/api/action/control';
import { created } from '../../../../../src/app/api/action/response';
import { Memgo } from '../../../memgodb';

export const create = (r: Request): ActionM<undefined> =>
    (pool
        .checkout<Memgo>('main')
        .chain(m => await(() => doCreate('account', r.body, m)))
        .chain(id => value(created({ id })))
        .chain(r => r));

const doCreate = (name: string, body: Object, m: Memgo): Future<number> =>
    m.collection(name)
        .insert(body);

export const setModuleFiltersWorks = (_: Request): ActionM<undefined> => {

    process.env.MODULE_FILTERS_WORK = 'yes';

    return next(_);

}
