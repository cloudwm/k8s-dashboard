// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ProvisionedNode, ProvisionList} from '@api/root.api';
import {Observable} from 'rxjs';
import {ResourceListBase} from '@common/resources/list';
import {NotificationsService} from '@common/services/global/notifications';
import {ListGroupIdentifier, ListIdentifier} from '@common/components/resourcelist/groupids';
import {CWM} from '@common/services/global/cwm';


@Component({
  selector: 'kd-provision-queue',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvisionQueueComponent extends ResourceListBase<ProvisionList, ProvisionedNode> {
  constructor(
    private readonly cwm_: CWM,
    notifications: NotificationsService,
    cdr: ChangeDetectorRef
  ) {
    super('pnode', notifications, cdr);
    this.id = ListIdentifier.pnode;
    this.groupId = ListGroupIdentifier.cluster;
    setInterval(() => {
      this.ngOnInit(); //shitty way, but it works
    }, 2500);
  }

  

  getResourceObservable(): Observable<ProvisionList> {
    return this.cwm_.getQueue()
  }

  map(provisionList: ProvisionList): ProvisionedNode[] {
    return provisionList.nodes;
  }

  getDisplayColumns(): string[] {
    return [
      'name',
      'created',
      'status'
    ];
  }
}
