import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsGetStartedPageAboutUsGetStartedPage
  extends Schema.CollectionType {
  collectionName: 'about_us_get_started_pages';
  info: {
    singularName: 'about-us-get-started-page';
    pluralName: 'about-us-get-started-pages';
    displayName: 'AboutUsGetStartedPage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutTitle: Attribute.Text & Attribute.Required;
    aboutContent: Attribute.Text & Attribute.Required;
    aboutList: Attribute.JSON & Attribute.Required;
    projectHeading: Attribute.Text & Attribute.Required;
    projectTitle: Attribute.Text & Attribute.Required;
    projectContent: Attribute.Text & Attribute.Required;
    projectButtonHeading: Attribute.Text & Attribute.Required;
    projectButtonLink: Attribute.Text & Attribute.Required;
    contactButtonHeading: Attribute.Text & Attribute.Required;
    contactButtonLink: Attribute.Text & Attribute.Required;
    imageSrc1: Attribute.Media & Attribute.Required;
    imageSrc2: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us-get-started-page.about-us-get-started-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us-get-started-page.about-us-get-started-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsPageAboutUsPage extends Schema.CollectionType {
  collectionName: 'about_us_pages';
  info: {
    singularName: 'about-us-page';
    pluralName: 'about-us-pages';
    displayName: 'AboutUSPage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.Text & Attribute.Required;
    contentList: Attribute.JSON & Attribute.Required;
    aboutValue: Attribute.Text & Attribute.Required;
    cardValue: Attribute.JSON & Attribute.Required;
    listValue: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us-page.about-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us-page.about-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsSecodSectionAboutUsSecodSection
  extends Schema.CollectionType {
  collectionName: 'about_us_secod_sections';
  info: {
    singularName: 'about-us-secod-section';
    pluralName: 'about-us-secod-sections';
    displayName: 'AboutUSSecodSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aimHeading: Attribute.Text & Attribute.Required;
    aimList: Attribute.JSON;
    teamHeading: Attribute.Text & Attribute.Required;
    teamList: Attribute.JSON & Attribute.Required;
    imageSrc1: Attribute.Media & Attribute.Required;
    imageSrc2: Attribute.Media & Attribute.Required;
    imageSrc3: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us-secod-section.about-us-secod-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us-secod-section.about-us-secod-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutusAboutus extends Schema.CollectionType {
  collectionName: 'aboutuses';
  info: {
    singularName: 'aboutus';
    pluralName: 'aboutuses';
    displayName: 'aboutus';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutus: Attribute.String & Attribute.Required;
    aboutusTitle: Attribute.Text & Attribute.Required;
    aboutusContent: Attribute.Text & Attribute.Required;
    aboutusList: Attribute.JSON & Attribute.Required;
    aboutusImage: Attribute.Media;
    aboutUsReadmoreLink: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::aboutus.aboutus',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::aboutus.aboutus',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainBannnerBlockChainBannner
  extends Schema.CollectionType {
  collectionName: 'block_chain_bannners';
  info: {
    singularName: 'block-chain-bannner';
    pluralName: 'block-chain-bannners';
    displayName: 'BlockChainBannner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-bannner.block-chain-bannner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-bannner.block-chain-bannner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainFifthSectionBlockChainFifthSection
  extends Schema.CollectionType {
  collectionName: 'block_chain_fifth_sections';
  info: {
    singularName: 'block-chain-fifth-section';
    pluralName: 'block-chain-fifth-sections';
    displayName: 'BlockChainFifthSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-fifth-section.block-chain-fifth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-fifth-section.block-chain-fifth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainFirstSectionBlockChainFirstSection
  extends Schema.CollectionType {
  collectionName: 'block_chain_first_sections';
  info: {
    singularName: 'block-chain-first-section';
    pluralName: 'block-chain-first-sections';
    displayName: 'BlockChainFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pageHeading: Attribute.String & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    subTitleList: Attribute.JSON & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    titleSecond: Attribute.Text & Attribute.Required;
    contentSecond: Attribute.Text & Attribute.Required;
    imageSerSecond: Attribute.Media & Attribute.Required;
    contentListFirst: Attribute.JSON & Attribute.Required;
    shortDesc: Attribute.Text & Attribute.Required;
    contentListSecond: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-first-section.block-chain-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-first-section.block-chain-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainSecondSectionBlockChainSecondSection
  extends Schema.CollectionType {
  collectionName: 'block_chain_second_sections';
  info: {
    singularName: 'block-chain-second-section';
    pluralName: 'block-chain-second-sections';
    displayName: 'BlockChainSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    cardlist: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-second-section.block-chain-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-second-section.block-chain-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainSectionFourthBlockChainSectionFourth
  extends Schema.CollectionType {
  collectionName: 'block_chain_section_fourths';
  info: {
    singularName: 'block-chain-section-fourth';
    pluralName: 'block-chain-section-fourths';
    displayName: 'BlockChainSectionFourth';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    points: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-section-fourth.block-chain-section-fourth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-section-fourth.block-chain-section-fourth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlockChainSixthSectionBlockChainSixthSection
  extends Schema.CollectionType {
  collectionName: 'block_chain_sixth_sections';
  info: {
    singularName: 'block-chain-sixth-section';
    pluralName: 'block-chain-sixth-sections';
    displayName: 'BlockChainSixthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.Text & Attribute.Required;
    cardData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::block-chain-sixth-section.block-chain-sixth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::block-chain-sixth-section.block-chain-sixth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogChainThirdSectionBlogChainThirdSection
  extends Schema.CollectionType {
  collectionName: 'blog_chain_third_sections';
  info: {
    singularName: 'blog-chain-third-section';
    pluralName: 'blog-chain-third-sections';
    displayName: 'BlogChainThirdSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-chain-third-section.blog-chain-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-chain-third-section.blog-chain-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCloudBannerCloudBanner extends Schema.CollectionType {
  collectionName: 'cloud_banners';
  info: {
    singularName: 'cloud-banner';
    pluralName: 'cloud-banners';
    displayName: 'CloudBanner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cloud-banner.cloud-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cloud-banner.cloud-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCloudConsultingFiveSectionTabCloudConsultingFiveSectionTab
  extends Schema.CollectionType {
  collectionName: 'cloud_consulting_five_section_tabs';
  info: {
    singularName: 'cloud-consulting-five-section-tab';
    pluralName: 'cloud-consulting-five-section-tabs';
    displayName: 'CloudConsultingFiveSectionTab';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cloud-consulting-five-section-tab.cloud-consulting-five-section-tab',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cloud-consulting-five-section-tab.cloud-consulting-five-section-tab',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCloudConsultingSectionFirstCloudConsultingSectionFirst
  extends Schema.CollectionType {
  collectionName: 'cloud_consulting_section_firsts';
  info: {
    singularName: 'cloud-consulting-section-first';
    pluralName: 'cloud-consulting-section-firsts';
    displayName: 'CloudConsultingSectionFirst';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mobileTitle1: Attribute.Text & Attribute.Required;
    mobile1imgSrc: Attribute.Media & Attribute.Required;
    mobile2imgSrc: Attribute.Media & Attribute.Required;
    listFirst: Attribute.JSON & Attribute.Required;
    listSecong: Attribute.JSON & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    mobileTitle2: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cloud-consulting-section-first.cloud-consulting-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cloud-consulting-section-first.cloud-consulting-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCloudConsultingSixSectionCloudConsultingSixSection
  extends Schema.CollectionType {
  collectionName: 'cloud_consulting_six_sections';
  info: {
    singularName: 'cloud-consulting-six-section';
    pluralName: 'cloud-consulting-six-sections';
    displayName: 'CloudConsultingSixSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cloud-consulting-six-section.cloud-consulting-six-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cloud-consulting-six-section.cloud-consulting-six-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCloudConsultngSectionThirdCloudConsultngSectionThird
  extends Schema.CollectionType {
  collectionName: 'cloud_consultng_section_thirds';
  info: {
    singularName: 'cloud-consultng-section-third';
    pluralName: 'cloud-consultng-section-thirds';
    displayName: 'CloudConsultngSectionThird';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.Text & Attribute.Required;
    cloudList: Attribute.JSON;
    description: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cloud-consultng-section-third.cloud-consultng-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cloud-consultng-section-third.cloud-consultng-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactUsFormSectionFirstContactUsFormSectionFirst
  extends Schema.CollectionType {
  collectionName: 'contact_us_form_section_firsts';
  info: {
    singularName: 'contact-us-form-section-first';
    pluralName: 'contact-us-form-section-firsts';
    displayName: 'ContactUsFormSectionFirst';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    whatsappNumber: Attribute.Text & Attribute.Required;
    phoneNumber: Attribute.Text & Attribute.Required;
    iframeSrc: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us-form-section-first.contact-us-form-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us-form-section-first.contact-us-form-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactUsPageSecondSectionContactUsPageSecondSection
  extends Schema.CollectionType {
  collectionName: 'contact_us_page_second_sections';
  info: {
    singularName: 'contact-us-page-second-section';
    pluralName: 'contact-us-page-second-sections';
    displayName: 'ContactUsPageSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.Text & Attribute.Required;
    email: Attribute.Text & Attribute.Required;
    watsapp: Attribute.Text & Attribute.Required;
    phone: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us-page-second-section.contact-us-page-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us-page-second-section.contact-us-page-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsBannerDevOpsBanner extends Schema.CollectionType {
  collectionName: 'dev_ops_banners';
  info: {
    singularName: 'dev-ops-banner';
    pluralName: 'dev-ops-banners';
    displayName: 'DevOpsBanner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-banner.dev-ops-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-banner.dev-ops-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsFiveDevOpsFive extends Schema.CollectionType {
  collectionName: 'dev_ops_fives';
  info: {
    singularName: 'dev-ops-five';
    pluralName: 'dev-ops-fives';
    displayName: 'DevOpsFive';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-five.dev-ops-five',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-five.dev-ops-five',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsPageFourthSectionDevOpsPageFourthSection
  extends Schema.CollectionType {
  collectionName: 'dev_ops_page_fourth_sections';
  info: {
    singularName: 'dev-ops-page-fourth-section';
    pluralName: 'dev-ops-page-fourth-sections';
    displayName: 'DevOpsPageFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    sighn: Attribute.String;
    label: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-page-fourth-section.dev-ops-page-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-page-fourth-section.dev-ops-page-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsPageSecondSectionDevOpsPageSecondSection
  extends Schema.CollectionType {
  collectionName: 'dev_ops_page_second_sections';
  info: {
    singularName: 'dev-ops-page-second-section';
    pluralName: 'dev-ops-page-second-sections';
    displayName: 'devOpsPageSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titleHead: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-page-second-section.dev-ops-page-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-page-second-section.dev-ops-page-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsPartnerSectionDevOpsPartnerSection
  extends Schema.CollectionType {
  collectionName: 'dev_ops_partner_sections';
  info: {
    singularName: 'dev-ops-partner-section';
    pluralName: 'dev-ops-partner-sections';
    displayName: 'DevOpsPartnerSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.Text & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    partnerimgSrc1: Attribute.Media & Attribute.Required;
    partnerimgSrc2: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-partner-section.dev-ops-partner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-partner-section.dev-ops-partner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevOpsSixDevOpsSix extends Schema.CollectionType {
  collectionName: 'dev_ops_sixes';
  info: {
    singularName: 'dev-ops-six';
    pluralName: 'dev-ops-sixes';
    displayName: 'DevOpsSix';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-ops-six.dev-ops-six',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-ops-six.dev-ops-six',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevopsPageFirstSectionDevopsPageFirstSection
  extends Schema.CollectionType {
  collectionName: 'devops_page_first_sections';
  info: {
    singularName: 'devops-page-first-section';
    pluralName: 'devops-page-first-sections';
    displayName: 'DevopsPageFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    SubTitle: Attribute.Text & Attribute.Required;
    subtitleList: Attribute.JSON & Attribute.Required;
    imgSrc1: Attribute.Media & Attribute.Required;
    imgSrc2: Attribute.Media & Attribute.Required;
    firstOverview: Attribute.JSON & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    overViewText: Attribute.Text & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::devops-page-first-section.devops-page-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::devops-page-first-section.devops-page-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooteImagesectionFooteImagesection
  extends Schema.CollectionType {
  collectionName: 'foote_imagesections';
  info: {
    singularName: 'foote-imagesection';
    pluralName: 'foote-imagesections';
    displayName: 'footeImagesection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    clutchWidget: Attribute.Blocks;
    trustpilotWidget: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::foote-imagesection.foote-imagesection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::foote-imagesection.foote-imagesection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterServImpLinkFooterServImpLink
  extends Schema.CollectionType {
  collectionName: 'footer_serv_imp_links';
  info: {
    singularName: 'footer-serv-imp-link';
    pluralName: 'footer-serv-imp-links';
    displayName: 'footerServImpLink';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    href: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-serv-imp-link.footer-serv-imp-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-serv-imp-link.footer-serv-imp-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterSocialLinkFooterSocialLink
  extends Schema.CollectionType {
  collectionName: 'footer_social_links';
  info: {
    singularName: 'footer-social-link';
    pluralName: 'footer-social-links';
    displayName: 'footerSocialLink';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    href: Attribute.String & Attribute.Required;
    icon: Attribute.String & Attribute.Required;
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-social-link.footer-social-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-social-link.footer-social-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFunFactFunFact extends Schema.CollectionType {
  collectionName: 'fun_facts';
  info: {
    singularName: 'fun-fact';
    pluralName: 'fun-facts';
    displayName: 'funFact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    value: Attribute.BigInteger & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    alt: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fun-fact.fun-fact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::fun-fact.fun-fact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeBannerHomeBanner extends Schema.CollectionType {
  collectionName: 'home_banners';
  info: {
    singularName: 'home-banner';
    pluralName: 'home-banners';
    displayName: 'HomeBanner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.Text & Attribute.Required;
    buttonText: Attribute.String & Attribute.Required;
    buttonLink: Attribute.String & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-banner.home-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-banner.home-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageSreviceHomePageSrevice
  extends Schema.CollectionType {
  collectionName: 'home_page_srevices';
  info: {
    singularName: 'home-page-srevice';
    pluralName: 'home-page-srevices';
    displayName: 'HomePageSrevice';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    serviceList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page-srevice.home-page-srevice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page-srevice.home-page-srevice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndstryFinanceEightSectionIndstryFinanceEightSection
  extends Schema.CollectionType {
  collectionName: 'indstry_finance_eight_sections';
  info: {
    singularName: 'indstry-finance-eight-section';
    pluralName: 'indstry-finance-eight-sections';
    displayName: 'IndstryFinanceEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::indstry-finance-eight-section.indstry-finance-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::indstry-finance-eight-section.indstry-finance-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndusryEducationFirstSectionIndusryEducationFirstSection
  extends Schema.CollectionType {
  collectionName: 'indusry_education_first_sections';
  info: {
    singularName: 'indusry-education-first-section';
    pluralName: 'indusry-education-first-sections';
    displayName: 'IndusryEducationFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::indusry-education-first-section.indusry-education-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::indusry-education-first-section.indusry-education-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareEightIndustriHealthCareEight
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_eights';
  info: {
    singularName: 'industri-health-care-eight';
    pluralName: 'industri-health-care-eights';
    displayName: 'IndustriHealthCareEight';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-eight.industri-health-care-eight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-eight.industri-health-care-eight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareFiveIndustriHealthCareFive
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_fives';
  info: {
    singularName: 'industri-health-care-five';
    pluralName: 'industri-health-care-fives';
    displayName: 'IndustriHealthCareFive';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-five.industri-health-care-five',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-five.industri-health-care-five',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareFourIndustriHealthCareFour
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_fours';
  info: {
    singularName: 'industri-health-care-four';
    pluralName: 'industri-health-care-fours';
    displayName: 'IndustriHealthCareFour';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-four.industri-health-care-four',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-four.industri-health-care-four',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareSeventhIndustriHealthCareSeventh
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_sevenths';
  info: {
    singularName: 'industri-health-care-seventh';
    pluralName: 'industri-health-care-sevenths';
    displayName: 'IndustriHealthCareSeventh';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-seventh.industri-health-care-seventh',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-seventh.industri-health-care-seventh',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareThreeIndustriHealthCareThree
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_threes';
  info: {
    singularName: 'industri-health-care-three';
    pluralName: 'industri-health-care-threes';
    displayName: 'IndustriHealthCareThree';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-three.industri-health-care-three',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-three.industri-health-care-three',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriHealthCareTwoIndustriHealthCareTwo
  extends Schema.CollectionType {
  collectionName: 'industri_health_care_twos';
  info: {
    singularName: 'industri-health-care-two';
    pluralName: 'industri-health-care-twos';
    displayName: 'IndustriHealthCareTwo';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-health-care-two.industri-health-care-two',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-health-care-two.industri-health-care-two',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriOnDemandSeventhSectionIndustriOnDemandSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industri_on_demand_seventh_sections';
  info: {
    singularName: 'industri-on-demand-seventh-section';
    pluralName: 'industri-on-demand-seventh-sections';
    displayName: 'IndustriOnDemandSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-on-demand-seventh-section.industri-on-demand-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-on-demand-seventh-section.industri-on-demand-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriOndemandEightSectionIndustriOndemandEightSection
  extends Schema.CollectionType {
  collectionName: 'industri_ondemand_eight_sections';
  info: {
    singularName: 'industri-ondemand-eight-section';
    pluralName: 'industri-ondemand-eight-sections';
    displayName: 'IndustriOndemandEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    projectName: Attribute.Text & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    technlogyUesd: Attribute.Text & Attribute.Required;
    projectImage: Attribute.Media & Attribute.Required;
    pateLinkHere: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-ondemand-eight-section.industri-ondemand-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-ondemand-eight-section.industri-ondemand-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriOndemandFiveSectionIndustriOndemandFiveSection
  extends Schema.CollectionType {
  collectionName: 'industri_ondemand_five_sections';
  info: {
    singularName: 'industri-ondemand-five-section';
    pluralName: 'industri-ondemand-five-sections';
    displayName: 'IndustriOndemandFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-ondemand-five-section.industri-ondemand-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-ondemand-five-section.industri-ondemand-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriOndemandSecondSectionIndustriOndemandSecondSection
  extends Schema.CollectionType {
  collectionName: 'industri_ondemand_second_sections';
  info: {
    singularName: 'industri-ondemand-second-section';
    pluralName: 'industri-ondemand-second-sections';
    displayName: 'IndustriOndemandSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-ondemand-second-section.industri-ondemand-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-ondemand-second-section.industri-ondemand-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustriOndemandThirdSectionIndustriOndemandThirdSection
  extends Schema.CollectionType {
  collectionName: 'industri_ondemand_third_sections';
  info: {
    singularName: 'industri-ondemand-third-section';
    pluralName: 'industri-ondemand-third-sections';
    displayName: 'IndustriOndemandThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industri-ondemand-third-section.industri-ondemand-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industri-ondemand-third-section.industri-ondemand-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureEightSectionIndustryAgricultureEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_eight_sections';
  info: {
    singularName: 'industry-agriculture-eight-section';
    pluralName: 'industry-agriculture-eight-sections';
    displayName: 'IndustryAgricultureEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-eight-section.industry-agriculture-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-eight-section.industry-agriculture-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureFIveSectionIndustryAgricultureFIveSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_f_ive_sections';
  info: {
    singularName: 'industry-agriculture-f-ive-section';
    pluralName: 'industry-agriculture-f-ive-sections';
    displayName: 'IndustryAgricultureFIveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-f-ive-section.industry-agriculture-f-ive-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-f-ive-section.industry-agriculture-f-ive-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureFirstSectionIndustryAgricultureFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_first_sections';
  info: {
    singularName: 'industry-agriculture-first-section';
    pluralName: 'industry-agriculture-first-sections';
    displayName: 'IndustryAgricultureFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-first-section.industry-agriculture-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-first-section.industry-agriculture-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureFourthSectionIndustryAgricultureFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_fourth_sections';
  info: {
    singularName: 'industry-agriculture-fourth-section';
    pluralName: 'industry-agriculture-fourth-sections';
    displayName: 'IndustryAgricultureFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-fourth-section.industry-agriculture-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-fourth-section.industry-agriculture-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureSecondSectionIndustryAgricultureSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_second_sections';
  info: {
    singularName: 'industry-agriculture-second-section';
    pluralName: 'industry-agriculture-second-sections';
    displayName: 'IndustryAgricultureSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-second-section.industry-agriculture-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-second-section.industry-agriculture-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureSeventhSectionIndustryAgricultureSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_seventh_sections';
  info: {
    singularName: 'industry-agriculture-seventh-section';
    pluralName: 'industry-agriculture-seventh-sections';
    displayName: 'IndustryAgricultureSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-seventh-section.industry-agriculture-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-seventh-section.industry-agriculture-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryAgricultureThirdSectionIndustryAgricultureThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_agriculture_third_sections';
  info: {
    singularName: 'industry-agriculture-third-section';
    pluralName: 'industry-agriculture-third-sections';
    displayName: 'IndustryAgricultureThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-agriculture-third-section.industry-agriculture-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-agriculture-third-section.industry-agriculture-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceEightSectionIndustryEcommerceEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_eight_sections';
  info: {
    singularName: 'industry-ecommerce-eight-section';
    pluralName: 'industry-ecommerce-eight-sections';
    displayName: 'IndustryEcommerceEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-eight-section.industry-ecommerce-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-eight-section.industry-ecommerce-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceFirstSectionIndustryEcommerceFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_first_sections';
  info: {
    singularName: 'industry-ecommerce-first-section';
    pluralName: 'industry-ecommerce-first-sections';
    displayName: 'IndustryEcommerceFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-first-section.industry-ecommerce-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-first-section.industry-ecommerce-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceFiveSectionIndustryEcommerceFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_five_sections';
  info: {
    singularName: 'industry-ecommerce-five-section';
    pluralName: 'industry-ecommerce-five-sections';
    displayName: 'IndustryEcommerceFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-five-section.industry-ecommerce-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-five-section.industry-ecommerce-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceSecondSectionIndustryEcommerceSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_second_sections';
  info: {
    singularName: 'industry-ecommerce-second-section';
    pluralName: 'industry-ecommerce-second-sections';
    displayName: 'IndustryEcommerceSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-second-section.industry-ecommerce-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-second-section.industry-ecommerce-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceSeventhSectionIndustryEcommerceSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_seventh_sections';
  info: {
    singularName: 'industry-ecommerce-seventh-section';
    pluralName: 'industry-ecommerce-seventh-sections';
    displayName: 'IndustryEcommerceSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-seventh-section.industry-ecommerce-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-seventh-section.industry-ecommerce-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEcommerceThridSectionIndustryEcommerceThridSection
  extends Schema.CollectionType {
  collectionName: 'industry_ecommerce_thrid_sections';
  info: {
    singularName: 'industry-ecommerce-thrid-section';
    pluralName: 'industry-ecommerce-thrid-sections';
    displayName: 'IndustryEcommerceThridSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ecommerce-thrid-section.industry-ecommerce-thrid-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ecommerce-thrid-section.industry-ecommerce-thrid-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationEightSectionIndustryEducationEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_education_eight_sections';
  info: {
    singularName: 'industry-education-eight-section';
    pluralName: 'industry-education-eight-sections';
    displayName: 'IndustryEducationEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-eight-section.industry-education-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-eight-section.industry-education-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationFIveSectionIndustryEducationFIveSection
  extends Schema.CollectionType {
  collectionName: 'industry_education_f_ive_sections';
  info: {
    singularName: 'industry-education-f-ive-section';
    pluralName: 'industry-education-f-ive-sections';
    displayName: 'IndustryEducationFIveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-f-ive-section.industry-education-f-ive-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-f-ive-section.industry-education-f-ive-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationFourthSectionIndustryEducationFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_education_fourth_sections';
  info: {
    singularName: 'industry-education-fourth-section';
    pluralName: 'industry-education-fourth-sections';
    displayName: 'industryEducationFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-fourth-section.industry-education-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-fourth-section.industry-education-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationSecondIndustryEducationSecond
  extends Schema.CollectionType {
  collectionName: 'industry_education_seconds';
  info: {
    singularName: 'industry-education-second';
    pluralName: 'industry-education-seconds';
    displayName: 'IndustryEducationSecond';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-second.industry-education-second',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-second.industry-education-second',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationSeventhSectionIndustryEducationSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_education_seventh_sections';
  info: {
    singularName: 'industry-education-seventh-section';
    pluralName: 'industry-education-seventh-sections';
    displayName: 'IndustryEducationSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-seventh-section.industry-education-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-seventh-section.industry-education-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEducationThirdSectionIndustryEducationThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_education_third_sections';
  info: {
    singularName: 'industry-education-third-section';
    pluralName: 'industry-education-third-sections';
    displayName: 'industryEducationThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-education-third-section.industry-education-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-education-third-section.industry-education-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentEigthSectionIndustryEnterTainmentEigthSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_eigth_sections';
  info: {
    singularName: 'industry-enter-tainment-eigth-section';
    pluralName: 'industry-enter-tainment-eigth-sections';
    displayName: 'IndustryEnterTainmentEigthSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-eigth-section.industry-enter-tainment-eigth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-eigth-section.industry-enter-tainment-eigth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentFirstSectionIndustryEnterTainmentFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_first_sections';
  info: {
    singularName: 'industry-enter-tainment-first-section';
    pluralName: 'industry-enter-tainment-first-sections';
    displayName: 'IndustryEnterTainmentFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-first-section.industry-enter-tainment-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-first-section.industry-enter-tainment-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentFiveSectionIndustryEnterTainmentFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_five_sections';
  info: {
    singularName: 'industry-enter-tainment-five-section';
    pluralName: 'industry-enter-tainment-five-sections';
    displayName: 'IndustryEnterTainmentFiveSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-five-section.industry-enter-tainment-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-five-section.industry-enter-tainment-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentFourthSectionIndustryEnterTainmentFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_fourth_sections';
  info: {
    singularName: 'industry-enter-tainment-fourth-section';
    pluralName: 'industry-enter-tainment-fourth-sections';
    displayName: 'IndustryEnterTainmentFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-fourth-section.industry-enter-tainment-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-fourth-section.industry-enter-tainment-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentSecondSectionIndustryEnterTainmentSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_second_sections';
  info: {
    singularName: 'industry-enter-tainment-second-section';
    pluralName: 'industry-enter-tainment-second-sections';
    displayName: 'IndustryEnterTainmentSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-second-section.industry-enter-tainment-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-second-section.industry-enter-tainment-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentSeventhSectionIndustryEnterTainmentSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_seventh_sections';
  info: {
    singularName: 'industry-enter-tainment-seventh-section';
    pluralName: 'industry-enter-tainment-seventh-sections';
    displayName: 'IndustryEnterTainmentSeventhSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-seventh-section.industry-enter-tainment-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-seventh-section.industry-enter-tainment-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEnterTainmentThirdSectionIndustryEnterTainmentThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_enter_tainment_third_sections';
  info: {
    singularName: 'industry-enter-tainment-third-section';
    pluralName: 'industry-enter-tainment-third-sections';
    displayName: 'IndustryEnterTainmentThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-enter-tainment-third-section.industry-enter-tainment-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-enter-tainment-third-section.industry-enter-tainment-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvEightSectionIndustryEvEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_eight_sections';
  info: {
    singularName: 'industry-ev-eight-section';
    pluralName: 'industry-ev-eight-sections';
    displayName: 'IndustryEvEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-eight-section.industry-ev-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-eight-section.industry-ev-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvFirstSectionIndustryEvFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_first_sections';
  info: {
    singularName: 'industry-ev-first-section';
    pluralName: 'industry-ev-first-sections';
    displayName: 'IndustryEvFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-first-section.industry-ev-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-first-section.industry-ev-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvFiveSectionIndustryEvFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_five_sections';
  info: {
    singularName: 'industry-ev-five-section';
    pluralName: 'industry-ev-five-sections';
    displayName: 'IndustryEvFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-five-section.industry-ev-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-five-section.industry-ev-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvFourthSectionIndustryEvFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_fourth_sections';
  info: {
    singularName: 'industry-ev-fourth-section';
    pluralName: 'industry-ev-fourth-sections';
    displayName: 'IndustryEvFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-fourth-section.industry-ev-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-fourth-section.industry-ev-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvSecondSectionIndustryEvSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_second_sections';
  info: {
    singularName: 'industry-ev-second-section';
    pluralName: 'industry-ev-second-sections';
    displayName: 'IndustryEvSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-second-section.industry-ev-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-second-section.industry-ev-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvSeventhSectionIndustryEvSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_seventh_sections';
  info: {
    singularName: 'industry-ev-seventh-section';
    pluralName: 'industry-ev-seventh-sections';
    displayName: 'IndustryEvSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-seventh-section.industry-ev-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-seventh-section.industry-ev-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEvThirdSectionIndustryEvThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_ev_third_sections';
  info: {
    singularName: 'industry-ev-third-section';
    pluralName: 'industry-ev-third-sections';
    displayName: 'IndustryEvThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-ev-third-section.industry-ev-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-ev-third-section.industry-ev-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventEightSectionIndustryEventEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_eight_sections';
  info: {
    singularName: 'industry-event-eight-section';
    pluralName: 'industry-event-eight-sections';
    displayName: 'IndustryEventEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-eight-section.industry-event-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-eight-section.industry-event-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventFirstSectiobIndustryEventFirstSectiob
  extends Schema.CollectionType {
  collectionName: 'industry_event_first_sectiobs';
  info: {
    singularName: 'industry-event-first-sectiob';
    pluralName: 'industry-event-first-sectiobs';
    displayName: 'IndustryEventFirstSectiob';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-first-sectiob.industry-event-first-sectiob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-first-sectiob.industry-event-first-sectiob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventFiveSectionIndustryEventFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_five_sections';
  info: {
    singularName: 'industry-event-five-section';
    pluralName: 'industry-event-five-sections';
    displayName: 'IndustryEventFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-five-section.industry-event-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-five-section.industry-event-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventFourthSectionIndustryEventFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_fourth_sections';
  info: {
    singularName: 'industry-event-fourth-section';
    pluralName: 'industry-event-fourth-sections';
    displayName: 'IndustryEventFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-fourth-section.industry-event-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-fourth-section.industry-event-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventSecondSectionIndustryEventSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_second_sections';
  info: {
    singularName: 'industry-event-second-section';
    pluralName: 'industry-event-second-sections';
    displayName: 'IndustryEventSecondSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-second-section.industry-event-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-second-section.industry-event-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventSeventhSectionIndustryEventSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_seventh_sections';
  info: {
    singularName: 'industry-event-seventh-section';
    pluralName: 'industry-event-seventh-sections';
    displayName: 'IndustryEventSeventhSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-seventh-section.industry-event-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-seventh-section.industry-event-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryEventThirdSectionIndustryEventThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_event_third_sections';
  info: {
    singularName: 'industry-event-third-section';
    pluralName: 'industry-event-third-sections';
    displayName: 'IndustryEventThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-event-third-section.industry-event-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-event-third-section.industry-event-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceFirstSectionIndustryFinanceFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_first_sections';
  info: {
    singularName: 'industry-finance-first-section';
    pluralName: 'industry-finance-first-sections';
    displayName: 'IndustryFinanceFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-first-section.industry-finance-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-first-section.industry-finance-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceFiveSectionIndustryFinanceFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_five_sections';
  info: {
    singularName: 'industry-finance-five-section';
    pluralName: 'industry-finance-five-sections';
    displayName: 'IndustryFinanceFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-five-section.industry-finance-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-five-section.industry-finance-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceFouthSectionIndustryFinanceFouthSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_fouth_sections';
  info: {
    singularName: 'industry-finance-fouth-section';
    pluralName: 'industry-finance-fouth-sections';
    displayName: 'IndustryFinanceFouthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-fouth-section.industry-finance-fouth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-fouth-section.industry-finance-fouth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceSecondSectionIndustryFinanceSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_second_sections';
  info: {
    singularName: 'industry-finance-second-section';
    pluralName: 'industry-finance-second-sections';
    displayName: 'IndustryFinanceSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-second-section.industry-finance-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-second-section.industry-finance-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceSeventhSectionIndustryFinanceSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_seventh_sections';
  info: {
    singularName: 'industry-finance-seventh-section';
    pluralName: 'industry-finance-seventh-sections';
    displayName: 'IndustryFinanceSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-seventh-section.industry-finance-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-seventh-section.industry-finance-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryFinanceThirdSectionIndustryFinanceThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_finance_third_sections';
  info: {
    singularName: 'industry-finance-third-section';
    pluralName: 'industry-finance-third-sections';
    displayName: 'IndustryFinanceThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-finance-third-section.industry-finance-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-finance-third-section.industry-finance-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryHealthCareFirstSectionIndustryHealthCareFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_health_care_first_sections';
  info: {
    singularName: 'industry-health-care-first-section';
    pluralName: 'industry-health-care-first-sections';
    displayName: 'IndustryHealthCareFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-health-care-first-section.industry-health-care-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-health-care-first-section.industry-health-care-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryHealthCareSixthSectionIndustryHealthCareSixthSection
  extends Schema.CollectionType {
  collectionName: 'industry_health_care_sixth_sections';
  info: {
    singularName: 'industry-health-care-sixth-section';
    pluralName: 'industry-health-care-sixth-sections';
    displayName: 'IndustryHealthCareSixthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-health-care-sixth-section.industry-health-care-sixth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-health-care-sixth-section.industry-health-care-sixth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryOnDemandEighthSectionIndustryOnDemandEighthSection
  extends Schema.CollectionType {
  collectionName: 'industry_on_demand_eighth_sections';
  info: {
    singularName: 'industry-on-demand-eighth-section';
    pluralName: 'industry-on-demand-eighth-sections';
    displayName: 'IndustryOnDemandEighthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-on-demand-eighth-section.industry-on-demand-eighth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-on-demand-eighth-section.industry-on-demand-eighth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryOnDemandFistSectionIndustryOnDemandFistSection
  extends Schema.CollectionType {
  collectionName: 'industry_on_demand_fist_sections';
  info: {
    singularName: 'industry-on-demand-fist-section';
    pluralName: 'industry-on-demand-fist-sections';
    displayName: 'IndustryOnDemandFistSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-on-demand-fist-section.industry-on-demand-fist-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-on-demand-fist-section.industry-on-demand-fist-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsFirstSectionIndustryPoliticsFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_first_sections';
  info: {
    singularName: 'industry-politics-first-section';
    pluralName: 'industry-politics-first-sections';
    displayName: 'IndustryPoliticsFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-first-section.industry-politics-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-first-section.industry-politics-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsFiveSectionIndustryPoliticsFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_five_sections';
  info: {
    singularName: 'industry-politics-five-section';
    pluralName: 'industry-politics-five-sections';
    displayName: 'IndustryPoliticsFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-five-section.industry-politics-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-five-section.industry-politics-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsFourthSectionIndustryPoliticsFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_fourth_sections';
  info: {
    singularName: 'industry-politics-fourth-section';
    pluralName: 'industry-politics-fourth-sections';
    displayName: 'IndustryPoliticsFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-fourth-section.industry-politics-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-fourth-section.industry-politics-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsSecondSectionIndustryPoliticsSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_second_sections';
  info: {
    singularName: 'industry-politics-second-section';
    pluralName: 'industry-politics-second-sections';
    displayName: 'IndustryPoliticsSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-second-section.industry-politics-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-second-section.industry-politics-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsSeventhSectionIndustryPoliticsSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_seventh_sections';
  info: {
    singularName: 'industry-politics-seventh-section';
    pluralName: 'industry-politics-seventh-sections';
    displayName: 'IndustryPoliticsSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-seventh-section.industry-politics-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-seventh-section.industry-politics-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryPoliticsThirdSectionIndustryPoliticsThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_politics_third_sections';
  info: {
    singularName: 'industry-politics-third-section';
    pluralName: 'industry-politics-third-sections';
    displayName: 'IndustryPoliticsThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-politics-third-section.industry-politics-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-politics-third-section.industry-politics-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateEightSectionIndustryRealstateEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_eight_sections';
  info: {
    singularName: 'industry-realstate-eight-section';
    pluralName: 'industry-realstate-eight-sections';
    displayName: 'IndustryRealstateEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-eight-section.industry-realstate-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-eight-section.industry-realstate-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateFirstSectionIndustryRealstateFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_first_sections';
  info: {
    singularName: 'industry-realstate-first-section';
    pluralName: 'industry-realstate-first-sections';
    displayName: 'IndustryRealstateFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-first-section.industry-realstate-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-first-section.industry-realstate-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateFiveSectionIndustryRealstateFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_five_sections';
  info: {
    singularName: 'industry-realstate-five-section';
    pluralName: 'industry-realstate-five-sections';
    displayName: 'IndustryRealstateFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-five-section.industry-realstate-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-five-section.industry-realstate-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateFourthSectionIndustryRealstateFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_fourth_sections';
  info: {
    singularName: 'industry-realstate-fourth-section';
    pluralName: 'industry-realstate-fourth-sections';
    displayName: 'IndustryRealstateFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-fourth-section.industry-realstate-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-fourth-section.industry-realstate-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateSecondSectionIndustryRealstateSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_second_sections';
  info: {
    singularName: 'industry-realstate-second-section';
    pluralName: 'industry-realstate-second-sections';
    displayName: 'IndustryRealstateSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-second-section.industry-realstate-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-second-section.industry-realstate-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateSeventhSectionIndustryRealstateSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_seventh_sections';
  info: {
    singularName: 'industry-realstate-seventh-section';
    pluralName: 'industry-realstate-seventh-sections';
    displayName: 'IndustryRealstateSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-seventh-section.industry-realstate-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-seventh-section.industry-realstate-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRealstateThirdSectionIndustryRealstateThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_realstate_third_sections';
  info: {
    singularName: 'industry-realstate-third-section';
    pluralName: 'industry-realstate-third-sections';
    displayName: 'IndustryRealstateThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-realstate-third-section.industry-realstate-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-realstate-third-section.industry-realstate-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRerstroFourthSectionIndustryRerstroFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_rerstro_fourth_sections';
  info: {
    singularName: 'industry-rerstro-fourth-section';
    pluralName: 'industry-rerstro-fourth-sections';
    displayName: 'IndustryRerstroFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-rerstro-fourth-section.industry-rerstro-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-rerstro-fourth-section.industry-rerstro-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroEightSectionIndustryRestroEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_eight_sections';
  info: {
    singularName: 'industry-restro-eight-section';
    pluralName: 'industry-restro-eight-sections';
    displayName: 'IndustryRestroEightSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-eight-section.industry-restro-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-eight-section.industry-restro-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroFirstSectionIndustryRestroFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_first_sections';
  info: {
    singularName: 'industry-restro-first-section';
    pluralName: 'industry-restro-first-sections';
    displayName: 'IndustryRestroFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-first-section.industry-restro-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-first-section.industry-restro-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroFiveSectionIndustryRestroFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_five_sections';
  info: {
    singularName: 'industry-restro-five-section';
    pluralName: 'industry-restro-five-sections';
    displayName: 'IndustryRestroFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-five-section.industry-restro-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-five-section.industry-restro-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroSecondSectionIndustryRestroSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_second_sections';
  info: {
    singularName: 'industry-restro-second-section';
    pluralName: 'industry-restro-second-sections';
    displayName: 'IndustryRestroSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-second-section.industry-restro-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-second-section.industry-restro-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroSeventhSectionIndustryRestroSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_seventh_sections';
  info: {
    singularName: 'industry-restro-seventh-section';
    pluralName: 'industry-restro-seventh-sections';
    displayName: 'IndustryRestroSeventhSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-seventh-section.industry-restro-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-seventh-section.industry-restro-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryRestroThirdSectionIndustryRestroThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_restro_third_sections';
  info: {
    singularName: 'industry-restro-third-section';
    pluralName: 'industry-restro-third-sections';
    displayName: 'IndustryRestroThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-restro-third-section.industry-restro-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-restro-third-section.industry-restro-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasEightSectionIndustrySaasEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_eight_sections';
  info: {
    singularName: 'industry-saas-eight-section';
    pluralName: 'industry-saas-eight-sections';
    displayName: 'IndustrySaasEightSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-eight-section.industry-saas-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-eight-section.industry-saas-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasFirstSectionIndustrySaasFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_first_sections';
  info: {
    singularName: 'industry-saas-first-section';
    pluralName: 'industry-saas-first-sections';
    displayName: 'IndustrySaasFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-first-section.industry-saas-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-first-section.industry-saas-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasFiveSectionIndustrySaasFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_five_sections';
  info: {
    singularName: 'industry-saas-five-section';
    pluralName: 'industry-saas-five-sections';
    displayName: 'IndustrySaasFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-five-section.industry-saas-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-five-section.industry-saas-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasFourthSectionIndustrySaasFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_fourth_sections';
  info: {
    singularName: 'industry-saas-fourth-section';
    pluralName: 'industry-saas-fourth-sections';
    displayName: 'IndustrySaasFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-fourth-section.industry-saas-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-fourth-section.industry-saas-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasSecondSectionIndustrySaasSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_second_sections';
  info: {
    singularName: 'industry-saas-second-section';
    pluralName: 'industry-saas-second-sections';
    displayName: 'IndustrySaasSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-second-section.industry-saas-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-second-section.industry-saas-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasSeventhSectionIndustrySaasSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_seventh_sections';
  info: {
    singularName: 'industry-saas-seventh-section';
    pluralName: 'industry-saas-seventh-sections';
    displayName: 'IndustrySaasSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-seventh-section.industry-saas-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-seventh-section.industry-saas-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustrySaasThirdSectionIndustrySaasThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_saas_third_sections';
  info: {
    singularName: 'industry-saas-third-section';
    pluralName: 'industry-saas-third-sections';
    displayName: 'IndustrySaasThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-saas-third-section.industry-saas-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-saas-third-section.industry-saas-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelEightSectionIndustryTravelEightSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_eight_sections';
  info: {
    singularName: 'industry-travel-eight-section';
    pluralName: 'industry-travel-eight-sections';
    displayName: 'IndustryTravelEightSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    products: Attribute.JSON & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-eight-section.industry-travel-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-eight-section.industry-travel-eight-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelFirstSectionIndustryTravelFirstSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_first_sections';
  info: {
    singularName: 'industry-travel-first-section';
    pluralName: 'industry-travel-first-sections';
    displayName: 'IndustryTravelFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-first-section.industry-travel-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-first-section.industry-travel-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelFiveSectionIndustryTravelFiveSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_five_sections';
  info: {
    singularName: 'industry-travel-five-section';
    pluralName: 'industry-travel-five-sections';
    displayName: 'IndustryTravelFiveSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-five-section.industry-travel-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-five-section.industry-travel-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelFourthSectionIndustryTravelFourthSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_fourth_sections';
  info: {
    singularName: 'industry-travel-fourth-section';
    pluralName: 'industry-travel-fourth-sections';
    displayName: 'IndustryTravelFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-fourth-section.industry-travel-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-fourth-section.industry-travel-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelSecondSectionIndustryTravelSecondSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_second_sections';
  info: {
    singularName: 'industry-travel-second-section';
    pluralName: 'industry-travel-second-sections';
    displayName: 'IndustryTravelSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-second-section.industry-travel-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-second-section.industry-travel-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelSeventhSectionIndustryTravelSeventhSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_seventh_sections';
  info: {
    singularName: 'industry-travel-seventh-section';
    pluralName: 'industry-travel-seventh-sections';
    displayName: 'IndustryTravelSeventhSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtile: Attribute.Text & Attribute.Required;
    products: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-seventh-section.industry-travel-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-seventh-section.industry-travel-seventh-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustryTravelThirdSectionIndustryTravelThirdSection
  extends Schema.CollectionType {
  collectionName: 'industry_travel_third_sections';
  info: {
    singularName: 'industry-travel-third-section';
    pluralName: 'industry-travel-third-sections';
    displayName: 'IndustryTravelThirdSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    cardList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industry-travel-third-section.industry-travel-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industry-travel-third-section.industry-travel-third-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustyEcommerceFourthSectionIndustyEcommerceFourthSection
  extends Schema.CollectionType {
  collectionName: 'industy_ecommerce_fourth_sections';
  info: {
    singularName: 'industy-ecommerce-fourth-section';
    pluralName: 'industy-ecommerce-fourth-sections';
    displayName: 'IndustyEcommerceFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industy-ecommerce-fourth-section.industy-ecommerce-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industy-ecommerce-fourth-section.industy-ecommerce-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustyOndemandFourthSectionIndustyOndemandFourthSection
  extends Schema.CollectionType {
  collectionName: 'industy_ondemand_fourth_sections';
  info: {
    singularName: 'industy-ondemand-fourth-section';
    pluralName: 'industy-ondemand-fourth-sections';
    displayName: 'IndustyOndemandFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industy-ondemand-fourth-section.industy-ondemand-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industy-ondemand-fourth-section.industy-ondemand-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndustyPoliticsFirstSectionIndustyPoliticsFirstSection
  extends Schema.CollectionType {
  collectionName: 'industy_politics_first_sections';
  info: {
    singularName: 'industy-politics-first-section';
    pluralName: 'industy-politics-first-sections';
    displayName: 'IndustyPoliticsFirstSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::industy-politics-first-section.industy-politics-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::industy-politics-first-section.industy-politics-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceBannerSectionItServiceBannerSection
  extends Schema.CollectionType {
  collectionName: 'it_service_banner_sections';
  info: {
    singularName: 'it-service-banner-section';
    pluralName: 'it-service-banner-sections';
    displayName: 'ItServiceBannerSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-banner-section.it-service-banner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-banner-section.it-service-banner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceFirstSectionItServiceFirstSection
  extends Schema.CollectionType {
  collectionName: 'it_service_first_sections';
  info: {
    singularName: 'it-service-first-section';
    pluralName: 'it-service-first-sections';
    displayName: 'ItServiceFirstSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title1: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    title1imgSrc: Attribute.Media & Attribute.Required;
    title1Subheading: Attribute.Text & Attribute.Required;
    titleList: Attribute.JSON & Attribute.Required;
    title2: Attribute.Text & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    listSec: Attribute.JSON & Attribute.Required;
    title2imgSrc: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-first-section.it-service-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-first-section.it-service-first-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceFiveSectionItServiceFiveSection
  extends Schema.CollectionType {
  collectionName: 'it_service_five_sections';
  info: {
    singularName: 'it-service-five-section';
    pluralName: 'it-service-five-sections';
    displayName: 'ItServiceFiveSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    point: Attribute.JSON & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-five-section.it-service-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-five-section.it-service-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceFourthSectionItServiceFourthSection
  extends Schema.CollectionType {
  collectionName: 'it_service_fourth_sections';
  info: {
    singularName: 'it-service-fourth-section';
    pluralName: 'it-service-fourth-sections';
    displayName: 'ItServiceFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-fourth-section.it-service-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-fourth-section.it-service-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceSecondItServiceSecond
  extends Schema.CollectionType {
  collectionName: 'it_service_seconds';
  info: {
    singularName: 'it-service-second';
    pluralName: 'it-service-seconds';
    displayName: 'ItServiceSecond';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceTitle: Attribute.Text & Attribute.Required;
    serviceContent: Attribute.Text & Attribute.Required;
    cardData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-second.it-service-second',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-second.it-service-second',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItServiceThirtSectionItServiceThirtSection
  extends Schema.CollectionType {
  collectionName: 'it_service_thirt_sections';
  info: {
    singularName: 'it-service-thirt-section';
    pluralName: 'it-service-thirt-sections';
    displayName: 'ItServiceThirtSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-service-thirt-section.it-service-thirt-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::it-service-thirt-section.it-service-thirt-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileDevelopmentMobileDevelopment
  extends Schema.CollectionType {
  collectionName: 'mobile_developments';
  info: {
    singularName: 'mobile-development';
    pluralName: 'mobile-developments';
    displayName: 'mobileDevelopment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mobileTitle1: Attribute.Text & Attribute.Required;
    mobile1imgSrc: Attribute.Media & Attribute.Required;
    mobileTitle2: Attribute.Text & Attribute.Required;
    mobile2imgSrc: Attribute.Media & Attribute.Required;
    listFirst: Attribute.JSON & Attribute.Required;
    listSecong: Attribute.JSON & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-development.mobile-development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-development.mobile-development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileDevelopmentBannerMobileDevelopmentBanner
  extends Schema.CollectionType {
  collectionName: 'mobile_development_banners';
  info: {
    singularName: 'mobile-development-banner';
    pluralName: 'mobile-development-banners';
    displayName: 'mobileDevelopmentBanner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-development-banner.mobile-development-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-development-banner.mobile-development-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileDevelopmentSectionFourMobileDevelopmentSectionFour
  extends Schema.CollectionType {
  collectionName: 'mobile_development_section_fours';
  info: {
    singularName: 'mobile-development-section-four';
    pluralName: 'mobile-development-section-fours';
    displayName: 'mobileDevelopmentSectionFour';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    mobileImage: Attribute.Media & Attribute.Required;
    point: Attribute.JSON & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-development-section-four.mobile-development-section-four',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-development-section-four.mobile-development-section-four',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileDevelopmentSectionThirdMobileDevelopmentSectionThird
  extends Schema.CollectionType {
  collectionName: 'mobile_development_section_thirds';
  info: {
    singularName: 'mobile-development-section-third';
    pluralName: 'mobile-development-section-thirds';
    displayName: 'mobileDevelopmentSectionThird';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-development-section-third.mobile-development-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-development-section-third.mobile-development-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileSectionFirstMobileSectionFirst
  extends Schema.CollectionType {
  collectionName: 'mobile_section_firsts';
  info: {
    singularName: 'mobile-section-first';
    pluralName: 'mobile-section-firsts';
    displayName: 'MobileSectionFirst';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mCard: Attribute.JSON;
    mServiceTitle: Attribute.Text & Attribute.Required;
    mServiceContent: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-section-first.mobile-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-section-first.mobile-section-first',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMyblogMyblog extends Schema.CollectionType {
  collectionName: 'myblogs';
  info: {
    singularName: 'myblog';
    pluralName: 'myblogs';
    displayName: 'myblog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.Text & Attribute.Required;
    Content: Attribute.Text;
    quotes: Attribute.Text & Attribute.Required;
    Benifit: Attribute.Text;
    Challengs: Attribute.Text;
    Conclusion: Attribute.Text;
    uploadImage: Attribute.Media;
    postedBy: Attribute.String & Attribute.Required;
    postedOn: Attribute.String;
    uploadimage2: Attribute.Media;
    uploadImage3: Attribute.Media;
    subtitle: Attribute.Text;
    subContetnt: Attribute.Text;
    subTitle2: Attribute.Text;
    subtitle2Content: Attribute.Text;
    subTitle3: Attribute.Text;
    subtitle3Content3: Attribute.Text;
    subtitle4: Attribute.Text;
    subtitle4Content4: Attribute.Text;
    subtitle5: Attribute.Text;
    subtitle5Content5: Attribute.String;
    subtitle6: Attribute.Text;
    subtitle6Content6: Attribute.Text;
    subtitle7: Attribute.Text;
    subtitle7Content7: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::myblog.myblog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::myblog.myblog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOnSelectOnSelect extends Schema.CollectionType {
  collectionName: 'on_selects';
  info: {
    singularName: 'on-select';
    pluralName: 'on-selects';
    displayName: 'OnSelect';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    onselectList: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::on-select.on-select',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::on-select.on-select',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'product';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    Number: Attribute.BigInteger;
    media: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageFirstBannerSectionProductPageFirstBannerSection
  extends Schema.CollectionType {
  collectionName: 'product_page_first_banner_sections';
  info: {
    singularName: 'product-page-first-banner-section';
    pluralName: 'product-page-first-banner-sections';
    displayName: 'ProductPageFirstBannerSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.Text & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    imageUrl: Attribute.Media & Attribute.Required;
    url: Attribute.Text & Attribute.Required;
    contactUrl: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-first-banner-section.product-page-first-banner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-first-banner-section.product-page-first-banner-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageSecondProductListProductPageSecondProductList
  extends Schema.CollectionType {
  collectionName: 'product_page_second_product_lists';
  info: {
    singularName: 'product-page-second-product-list';
    pluralName: 'product-page-second-product-lists';
    displayName: 'ProductPageSecondProductList';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    imageSrc: Attribute.Media & Attribute.Required;
    altText: Attribute.Text & Attribute.Required;
    bookImageSrc: Attribute.Media & Attribute.Required;
    productName: Attribute.Text & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    type: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-second-product-list.product-page-second-product-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-second-product-list.product-page-second-product-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    imgSrc: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    titleTwo: Attribute.String & Attribute.Required;
    link: Attribute.String;
    siteinformation: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::siteinformation.siteinformation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    icon: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    rgtIcon: Attribute.String & Attribute.Required;
    serviceImage: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSiteinformationSiteinformation
  extends Schema.CollectionType {
  collectionName: 'siteinformations';
  info: {
    singularName: 'siteinformation';
    pluralName: 'siteinformations';
    displayName: 'siteinformation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    projextTitle: Attribute.String;
    projectDesc: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::siteinformation.siteinformation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::siteinformation.siteinformation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSolutionTabSolutionTab extends Schema.CollectionType {
  collectionName: 'solution_tabs';
  info: {
    singularName: 'solution-tab';
    pluralName: 'solution-tabs';
    displayName: 'solutionTab';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    uid: Attribute.String & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    heading: Attribute.Text & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    points: Attribute.JSON & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::solution-tab.solution-tab',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::solution-tab.solution-tab',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscribestyleSubscribestyle extends Schema.CollectionType {
  collectionName: 'subscribestyles';
  info: {
    singularName: 'subscribestyle';
    pluralName: 'subscribestyles';
    displayName: 'subscribestyle';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subsImage: Attribute.Media & Attribute.Required;
    subsTitle: Attribute.Text & Attribute.Required;
    subsText: Attribute.Text & Attribute.Required;
    subsIfram: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscribestyle.subscribestyle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscribestyle.subscribestyle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimunialTestimunial extends Schema.CollectionType {
  collectionName: 'testimunials';
  info: {
    singularName: 'testimunial';
    pluralName: 'testimunials';
    displayName: 'testimunial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clientImage: Attribute.Media & Attribute.Required;
    clientName: Attribute.String & Attribute.Required;
    clienDesignation: Attribute.String & Attribute.Required;
    aboutClint: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimunial.testimunial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimunial.testimunial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUiUxBannerUiUxBanner extends Schema.CollectionType {
  collectionName: 'ui_ux_banners';
  info: {
    singularName: 'ui-ux-banner';
    pluralName: 'ui-ux-banners';
    displayName: 'UiUxBanner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    imageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ui-ux-banner.ui-ux-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ui-ux-banner.ui-ux-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUiUxFiveSectionUiUxFiveSection
  extends Schema.CollectionType {
  collectionName: 'ui_ux_five_sections';
  info: {
    singularName: 'ui-ux-five-section';
    pluralName: 'ui-ux-five-sections';
    displayName: 'UiUXFiveSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    listData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ui-ux-five-section.ui-ux-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ui-ux-five-section.ui-ux-five-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUiUxFourthSectionUiUxFourthSection
  extends Schema.CollectionType {
  collectionName: 'ui_ux_fourth_sections';
  info: {
    singularName: 'ui-ux-fourth-section';
    pluralName: 'ui-ux-fourth-sections';
    displayName: 'UiUxFourthSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    point: Attribute.JSON & Attribute.Required;
    shortDescription: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ui-ux-fourth-section.ui-ux-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ui-ux-fourth-section.ui-ux-fourth-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUiUxSecondSectionUiUxSecondSection
  extends Schema.CollectionType {
  collectionName: 'ui_ux_second_sections';
  info: {
    singularName: 'ui-ux-second-section';
    pluralName: 'ui-ux-second-sections';
    displayName: 'UiUxSecondSection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceTitle: Attribute.Text & Attribute.Required;
    serviceContent: Attribute.Text & Attribute.Required;
    cardData: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ui-ux-second-section.ui-ux-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ui-ux-second-section.ui-ux-second-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUiUxThirdSectiobUiUxThirdSectiob
  extends Schema.CollectionType {
  collectionName: 'ui_ux_third_sectiobs';
  info: {
    singularName: 'ui-ux-third-sectiob';
    pluralName: 'ui-ux-third-sectiobs';
    displayName: 'UiUxThirdSectiob';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ui-ux-third-sectiob.ui-ux-third-sectiob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ui-ux-third-sectiob.ui-ux-third-sectiob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWeSectionOneWeSectionOne extends Schema.CollectionType {
  collectionName: 'we_section_ones';
  info: {
    singularName: 'we-section-one';
    pluralName: 'we-section-ones';
    displayName: 'weSectionOne';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title1: Attribute.Text & Attribute.Required;
    title1List: Attribute.JSON;
    title1Subheading: Attribute.Text & Attribute.Required;
    title2: Attribute.Text & Attribute.Required;
    title2imgSrc: Attribute.Media & Attribute.Required;
    title1imgSrc: Attribute.Media & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    listSec: Attribute.JSON & Attribute.Required;
    shortDescription: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::we-section-one.we-section-one',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::we-section-one.we-section-one',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebBannerWebBanner extends Schema.CollectionType {
  collectionName: 'web_banners';
  info: {
    singularName: 'web-banner';
    pluralName: 'web-banners';
    displayName: 'webBanner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    para: Attribute.Text & Attribute.Required;
    ImageSrc: Attribute.Media & Attribute.Required;
    btnText: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::web-banner.web-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::web-banner.web-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebSectionFourthWebSectionFourth
  extends Schema.CollectionType {
  collectionName: 'web_section_fourths';
  info: {
    singularName: 'web-section-fourth';
    pluralName: 'web-section-fourths';
    displayName: 'webSectionFourth';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    point: Attribute.JSON;
    shortDescription: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::web-section-fourth.web-section-fourth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::web-section-fourth.web-section-fourth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebSectionThirdWebSectionThird
  extends Schema.CollectionType {
  collectionName: 'web_section_thirds';
  info: {
    singularName: 'web-section-third';
    pluralName: 'web-section-thirds';
    displayName: 'webSectionThird';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text & Attribute.Required;
    list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::web-section-third.web-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::web-section-third.web-section-third',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebSectionTwoWebSectionTwo extends Schema.CollectionType {
  collectionName: 'web_section_twos';
  info: {
    singularName: 'web-section-two';
    pluralName: 'web-section-twos';
    displayName: 'webSectionTwo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceTitle: Attribute.Text & Attribute.Required;
    serviceContent: Attribute.Text & Attribute.Required;
    cardData: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::web-section-two.web-section-two',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::web-section-two.web-section-two',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::about-us-get-started-page.about-us-get-started-page': ApiAboutUsGetStartedPageAboutUsGetStartedPage;
      'api::about-us-page.about-us-page': ApiAboutUsPageAboutUsPage;
      'api::about-us-secod-section.about-us-secod-section': ApiAboutUsSecodSectionAboutUsSecodSection;
      'api::aboutus.aboutus': ApiAboutusAboutus;
      'api::block-chain-bannner.block-chain-bannner': ApiBlockChainBannnerBlockChainBannner;
      'api::block-chain-fifth-section.block-chain-fifth-section': ApiBlockChainFifthSectionBlockChainFifthSection;
      'api::block-chain-first-section.block-chain-first-section': ApiBlockChainFirstSectionBlockChainFirstSection;
      'api::block-chain-second-section.block-chain-second-section': ApiBlockChainSecondSectionBlockChainSecondSection;
      'api::block-chain-section-fourth.block-chain-section-fourth': ApiBlockChainSectionFourthBlockChainSectionFourth;
      'api::block-chain-sixth-section.block-chain-sixth-section': ApiBlockChainSixthSectionBlockChainSixthSection;
      'api::blog-chain-third-section.blog-chain-third-section': ApiBlogChainThirdSectionBlogChainThirdSection;
      'api::cloud-banner.cloud-banner': ApiCloudBannerCloudBanner;
      'api::cloud-consulting-five-section-tab.cloud-consulting-five-section-tab': ApiCloudConsultingFiveSectionTabCloudConsultingFiveSectionTab;
      'api::cloud-consulting-section-first.cloud-consulting-section-first': ApiCloudConsultingSectionFirstCloudConsultingSectionFirst;
      'api::cloud-consulting-six-section.cloud-consulting-six-section': ApiCloudConsultingSixSectionCloudConsultingSixSection;
      'api::cloud-consultng-section-third.cloud-consultng-section-third': ApiCloudConsultngSectionThirdCloudConsultngSectionThird;
      'api::contact-us-form-section-first.contact-us-form-section-first': ApiContactUsFormSectionFirstContactUsFormSectionFirst;
      'api::contact-us-page-second-section.contact-us-page-second-section': ApiContactUsPageSecondSectionContactUsPageSecondSection;
      'api::dev-ops-banner.dev-ops-banner': ApiDevOpsBannerDevOpsBanner;
      'api::dev-ops-five.dev-ops-five': ApiDevOpsFiveDevOpsFive;
      'api::dev-ops-page-fourth-section.dev-ops-page-fourth-section': ApiDevOpsPageFourthSectionDevOpsPageFourthSection;
      'api::dev-ops-page-second-section.dev-ops-page-second-section': ApiDevOpsPageSecondSectionDevOpsPageSecondSection;
      'api::dev-ops-partner-section.dev-ops-partner-section': ApiDevOpsPartnerSectionDevOpsPartnerSection;
      'api::dev-ops-six.dev-ops-six': ApiDevOpsSixDevOpsSix;
      'api::devops-page-first-section.devops-page-first-section': ApiDevopsPageFirstSectionDevopsPageFirstSection;
      'api::foote-imagesection.foote-imagesection': ApiFooteImagesectionFooteImagesection;
      'api::footer-serv-imp-link.footer-serv-imp-link': ApiFooterServImpLinkFooterServImpLink;
      'api::footer-social-link.footer-social-link': ApiFooterSocialLinkFooterSocialLink;
      'api::fun-fact.fun-fact': ApiFunFactFunFact;
      'api::home-banner.home-banner': ApiHomeBannerHomeBanner;
      'api::home-page-srevice.home-page-srevice': ApiHomePageSreviceHomePageSrevice;
      'api::indstry-finance-eight-section.indstry-finance-eight-section': ApiIndstryFinanceEightSectionIndstryFinanceEightSection;
      'api::indusry-education-first-section.indusry-education-first-section': ApiIndusryEducationFirstSectionIndusryEducationFirstSection;
      'api::industri-health-care-eight.industri-health-care-eight': ApiIndustriHealthCareEightIndustriHealthCareEight;
      'api::industri-health-care-five.industri-health-care-five': ApiIndustriHealthCareFiveIndustriHealthCareFive;
      'api::industri-health-care-four.industri-health-care-four': ApiIndustriHealthCareFourIndustriHealthCareFour;
      'api::industri-health-care-seventh.industri-health-care-seventh': ApiIndustriHealthCareSeventhIndustriHealthCareSeventh;
      'api::industri-health-care-three.industri-health-care-three': ApiIndustriHealthCareThreeIndustriHealthCareThree;
      'api::industri-health-care-two.industri-health-care-two': ApiIndustriHealthCareTwoIndustriHealthCareTwo;
      'api::industri-on-demand-seventh-section.industri-on-demand-seventh-section': ApiIndustriOnDemandSeventhSectionIndustriOnDemandSeventhSection;
      'api::industri-ondemand-eight-section.industri-ondemand-eight-section': ApiIndustriOndemandEightSectionIndustriOndemandEightSection;
      'api::industri-ondemand-five-section.industri-ondemand-five-section': ApiIndustriOndemandFiveSectionIndustriOndemandFiveSection;
      'api::industri-ondemand-second-section.industri-ondemand-second-section': ApiIndustriOndemandSecondSectionIndustriOndemandSecondSection;
      'api::industri-ondemand-third-section.industri-ondemand-third-section': ApiIndustriOndemandThirdSectionIndustriOndemandThirdSection;
      'api::industry-agriculture-eight-section.industry-agriculture-eight-section': ApiIndustryAgricultureEightSectionIndustryAgricultureEightSection;
      'api::industry-agriculture-f-ive-section.industry-agriculture-f-ive-section': ApiIndustryAgricultureFIveSectionIndustryAgricultureFIveSection;
      'api::industry-agriculture-first-section.industry-agriculture-first-section': ApiIndustryAgricultureFirstSectionIndustryAgricultureFirstSection;
      'api::industry-agriculture-fourth-section.industry-agriculture-fourth-section': ApiIndustryAgricultureFourthSectionIndustryAgricultureFourthSection;
      'api::industry-agriculture-second-section.industry-agriculture-second-section': ApiIndustryAgricultureSecondSectionIndustryAgricultureSecondSection;
      'api::industry-agriculture-seventh-section.industry-agriculture-seventh-section': ApiIndustryAgricultureSeventhSectionIndustryAgricultureSeventhSection;
      'api::industry-agriculture-third-section.industry-agriculture-third-section': ApiIndustryAgricultureThirdSectionIndustryAgricultureThirdSection;
      'api::industry-ecommerce-eight-section.industry-ecommerce-eight-section': ApiIndustryEcommerceEightSectionIndustryEcommerceEightSection;
      'api::industry-ecommerce-first-section.industry-ecommerce-first-section': ApiIndustryEcommerceFirstSectionIndustryEcommerceFirstSection;
      'api::industry-ecommerce-five-section.industry-ecommerce-five-section': ApiIndustryEcommerceFiveSectionIndustryEcommerceFiveSection;
      'api::industry-ecommerce-second-section.industry-ecommerce-second-section': ApiIndustryEcommerceSecondSectionIndustryEcommerceSecondSection;
      'api::industry-ecommerce-seventh-section.industry-ecommerce-seventh-section': ApiIndustryEcommerceSeventhSectionIndustryEcommerceSeventhSection;
      'api::industry-ecommerce-thrid-section.industry-ecommerce-thrid-section': ApiIndustryEcommerceThridSectionIndustryEcommerceThridSection;
      'api::industry-education-eight-section.industry-education-eight-section': ApiIndustryEducationEightSectionIndustryEducationEightSection;
      'api::industry-education-f-ive-section.industry-education-f-ive-section': ApiIndustryEducationFIveSectionIndustryEducationFIveSection;
      'api::industry-education-fourth-section.industry-education-fourth-section': ApiIndustryEducationFourthSectionIndustryEducationFourthSection;
      'api::industry-education-second.industry-education-second': ApiIndustryEducationSecondIndustryEducationSecond;
      'api::industry-education-seventh-section.industry-education-seventh-section': ApiIndustryEducationSeventhSectionIndustryEducationSeventhSection;
      'api::industry-education-third-section.industry-education-third-section': ApiIndustryEducationThirdSectionIndustryEducationThirdSection;
      'api::industry-enter-tainment-eigth-section.industry-enter-tainment-eigth-section': ApiIndustryEnterTainmentEigthSectionIndustryEnterTainmentEigthSection;
      'api::industry-enter-tainment-first-section.industry-enter-tainment-first-section': ApiIndustryEnterTainmentFirstSectionIndustryEnterTainmentFirstSection;
      'api::industry-enter-tainment-five-section.industry-enter-tainment-five-section': ApiIndustryEnterTainmentFiveSectionIndustryEnterTainmentFiveSection;
      'api::industry-enter-tainment-fourth-section.industry-enter-tainment-fourth-section': ApiIndustryEnterTainmentFourthSectionIndustryEnterTainmentFourthSection;
      'api::industry-enter-tainment-second-section.industry-enter-tainment-second-section': ApiIndustryEnterTainmentSecondSectionIndustryEnterTainmentSecondSection;
      'api::industry-enter-tainment-seventh-section.industry-enter-tainment-seventh-section': ApiIndustryEnterTainmentSeventhSectionIndustryEnterTainmentSeventhSection;
      'api::industry-enter-tainment-third-section.industry-enter-tainment-third-section': ApiIndustryEnterTainmentThirdSectionIndustryEnterTainmentThirdSection;
      'api::industry-ev-eight-section.industry-ev-eight-section': ApiIndustryEvEightSectionIndustryEvEightSection;
      'api::industry-ev-first-section.industry-ev-first-section': ApiIndustryEvFirstSectionIndustryEvFirstSection;
      'api::industry-ev-five-section.industry-ev-five-section': ApiIndustryEvFiveSectionIndustryEvFiveSection;
      'api::industry-ev-fourth-section.industry-ev-fourth-section': ApiIndustryEvFourthSectionIndustryEvFourthSection;
      'api::industry-ev-second-section.industry-ev-second-section': ApiIndustryEvSecondSectionIndustryEvSecondSection;
      'api::industry-ev-seventh-section.industry-ev-seventh-section': ApiIndustryEvSeventhSectionIndustryEvSeventhSection;
      'api::industry-ev-third-section.industry-ev-third-section': ApiIndustryEvThirdSectionIndustryEvThirdSection;
      'api::industry-event-eight-section.industry-event-eight-section': ApiIndustryEventEightSectionIndustryEventEightSection;
      'api::industry-event-first-sectiob.industry-event-first-sectiob': ApiIndustryEventFirstSectiobIndustryEventFirstSectiob;
      'api::industry-event-five-section.industry-event-five-section': ApiIndustryEventFiveSectionIndustryEventFiveSection;
      'api::industry-event-fourth-section.industry-event-fourth-section': ApiIndustryEventFourthSectionIndustryEventFourthSection;
      'api::industry-event-second-section.industry-event-second-section': ApiIndustryEventSecondSectionIndustryEventSecondSection;
      'api::industry-event-seventh-section.industry-event-seventh-section': ApiIndustryEventSeventhSectionIndustryEventSeventhSection;
      'api::industry-event-third-section.industry-event-third-section': ApiIndustryEventThirdSectionIndustryEventThirdSection;
      'api::industry-finance-first-section.industry-finance-first-section': ApiIndustryFinanceFirstSectionIndustryFinanceFirstSection;
      'api::industry-finance-five-section.industry-finance-five-section': ApiIndustryFinanceFiveSectionIndustryFinanceFiveSection;
      'api::industry-finance-fouth-section.industry-finance-fouth-section': ApiIndustryFinanceFouthSectionIndustryFinanceFouthSection;
      'api::industry-finance-second-section.industry-finance-second-section': ApiIndustryFinanceSecondSectionIndustryFinanceSecondSection;
      'api::industry-finance-seventh-section.industry-finance-seventh-section': ApiIndustryFinanceSeventhSectionIndustryFinanceSeventhSection;
      'api::industry-finance-third-section.industry-finance-third-section': ApiIndustryFinanceThirdSectionIndustryFinanceThirdSection;
      'api::industry-health-care-first-section.industry-health-care-first-section': ApiIndustryHealthCareFirstSectionIndustryHealthCareFirstSection;
      'api::industry-health-care-sixth-section.industry-health-care-sixth-section': ApiIndustryHealthCareSixthSectionIndustryHealthCareSixthSection;
      'api::industry-on-demand-eighth-section.industry-on-demand-eighth-section': ApiIndustryOnDemandEighthSectionIndustryOnDemandEighthSection;
      'api::industry-on-demand-fist-section.industry-on-demand-fist-section': ApiIndustryOnDemandFistSectionIndustryOnDemandFistSection;
      'api::industry-politics-first-section.industry-politics-first-section': ApiIndustryPoliticsFirstSectionIndustryPoliticsFirstSection;
      'api::industry-politics-five-section.industry-politics-five-section': ApiIndustryPoliticsFiveSectionIndustryPoliticsFiveSection;
      'api::industry-politics-fourth-section.industry-politics-fourth-section': ApiIndustryPoliticsFourthSectionIndustryPoliticsFourthSection;
      'api::industry-politics-second-section.industry-politics-second-section': ApiIndustryPoliticsSecondSectionIndustryPoliticsSecondSection;
      'api::industry-politics-seventh-section.industry-politics-seventh-section': ApiIndustryPoliticsSeventhSectionIndustryPoliticsSeventhSection;
      'api::industry-politics-third-section.industry-politics-third-section': ApiIndustryPoliticsThirdSectionIndustryPoliticsThirdSection;
      'api::industry-realstate-eight-section.industry-realstate-eight-section': ApiIndustryRealstateEightSectionIndustryRealstateEightSection;
      'api::industry-realstate-first-section.industry-realstate-first-section': ApiIndustryRealstateFirstSectionIndustryRealstateFirstSection;
      'api::industry-realstate-five-section.industry-realstate-five-section': ApiIndustryRealstateFiveSectionIndustryRealstateFiveSection;
      'api::industry-realstate-fourth-section.industry-realstate-fourth-section': ApiIndustryRealstateFourthSectionIndustryRealstateFourthSection;
      'api::industry-realstate-second-section.industry-realstate-second-section': ApiIndustryRealstateSecondSectionIndustryRealstateSecondSection;
      'api::industry-realstate-seventh-section.industry-realstate-seventh-section': ApiIndustryRealstateSeventhSectionIndustryRealstateSeventhSection;
      'api::industry-realstate-third-section.industry-realstate-third-section': ApiIndustryRealstateThirdSectionIndustryRealstateThirdSection;
      'api::industry-rerstro-fourth-section.industry-rerstro-fourth-section': ApiIndustryRerstroFourthSectionIndustryRerstroFourthSection;
      'api::industry-restro-eight-section.industry-restro-eight-section': ApiIndustryRestroEightSectionIndustryRestroEightSection;
      'api::industry-restro-first-section.industry-restro-first-section': ApiIndustryRestroFirstSectionIndustryRestroFirstSection;
      'api::industry-restro-five-section.industry-restro-five-section': ApiIndustryRestroFiveSectionIndustryRestroFiveSection;
      'api::industry-restro-second-section.industry-restro-second-section': ApiIndustryRestroSecondSectionIndustryRestroSecondSection;
      'api::industry-restro-seventh-section.industry-restro-seventh-section': ApiIndustryRestroSeventhSectionIndustryRestroSeventhSection;
      'api::industry-restro-third-section.industry-restro-third-section': ApiIndustryRestroThirdSectionIndustryRestroThirdSection;
      'api::industry-saas-eight-section.industry-saas-eight-section': ApiIndustrySaasEightSectionIndustrySaasEightSection;
      'api::industry-saas-first-section.industry-saas-first-section': ApiIndustrySaasFirstSectionIndustrySaasFirstSection;
      'api::industry-saas-five-section.industry-saas-five-section': ApiIndustrySaasFiveSectionIndustrySaasFiveSection;
      'api::industry-saas-fourth-section.industry-saas-fourth-section': ApiIndustrySaasFourthSectionIndustrySaasFourthSection;
      'api::industry-saas-second-section.industry-saas-second-section': ApiIndustrySaasSecondSectionIndustrySaasSecondSection;
      'api::industry-saas-seventh-section.industry-saas-seventh-section': ApiIndustrySaasSeventhSectionIndustrySaasSeventhSection;
      'api::industry-saas-third-section.industry-saas-third-section': ApiIndustrySaasThirdSectionIndustrySaasThirdSection;
      'api::industry-travel-eight-section.industry-travel-eight-section': ApiIndustryTravelEightSectionIndustryTravelEightSection;
      'api::industry-travel-first-section.industry-travel-first-section': ApiIndustryTravelFirstSectionIndustryTravelFirstSection;
      'api::industry-travel-five-section.industry-travel-five-section': ApiIndustryTravelFiveSectionIndustryTravelFiveSection;
      'api::industry-travel-fourth-section.industry-travel-fourth-section': ApiIndustryTravelFourthSectionIndustryTravelFourthSection;
      'api::industry-travel-second-section.industry-travel-second-section': ApiIndustryTravelSecondSectionIndustryTravelSecondSection;
      'api::industry-travel-seventh-section.industry-travel-seventh-section': ApiIndustryTravelSeventhSectionIndustryTravelSeventhSection;
      'api::industry-travel-third-section.industry-travel-third-section': ApiIndustryTravelThirdSectionIndustryTravelThirdSection;
      'api::industy-ecommerce-fourth-section.industy-ecommerce-fourth-section': ApiIndustyEcommerceFourthSectionIndustyEcommerceFourthSection;
      'api::industy-ondemand-fourth-section.industy-ondemand-fourth-section': ApiIndustyOndemandFourthSectionIndustyOndemandFourthSection;
      'api::industy-politics-first-section.industy-politics-first-section': ApiIndustyPoliticsFirstSectionIndustyPoliticsFirstSection;
      'api::it-service-banner-section.it-service-banner-section': ApiItServiceBannerSectionItServiceBannerSection;
      'api::it-service-first-section.it-service-first-section': ApiItServiceFirstSectionItServiceFirstSection;
      'api::it-service-five-section.it-service-five-section': ApiItServiceFiveSectionItServiceFiveSection;
      'api::it-service-fourth-section.it-service-fourth-section': ApiItServiceFourthSectionItServiceFourthSection;
      'api::it-service-second.it-service-second': ApiItServiceSecondItServiceSecond;
      'api::it-service-thirt-section.it-service-thirt-section': ApiItServiceThirtSectionItServiceThirtSection;
      'api::mobile-development.mobile-development': ApiMobileDevelopmentMobileDevelopment;
      'api::mobile-development-banner.mobile-development-banner': ApiMobileDevelopmentBannerMobileDevelopmentBanner;
      'api::mobile-development-section-four.mobile-development-section-four': ApiMobileDevelopmentSectionFourMobileDevelopmentSectionFour;
      'api::mobile-development-section-third.mobile-development-section-third': ApiMobileDevelopmentSectionThirdMobileDevelopmentSectionThird;
      'api::mobile-section-first.mobile-section-first': ApiMobileSectionFirstMobileSectionFirst;
      'api::myblog.myblog': ApiMyblogMyblog;
      'api::on-select.on-select': ApiOnSelectOnSelect;
      'api::product.product': ApiProductProduct;
      'api::product-page-first-banner-section.product-page-first-banner-section': ApiProductPageFirstBannerSectionProductPageFirstBannerSection;
      'api::product-page-second-product-list.product-page-second-product-list': ApiProductPageSecondProductListProductPageSecondProductList;
      'api::project.project': ApiProjectProject;
      'api::service.service': ApiServiceService;
      'api::siteinformation.siteinformation': ApiSiteinformationSiteinformation;
      'api::solution-tab.solution-tab': ApiSolutionTabSolutionTab;
      'api::subscribestyle.subscribestyle': ApiSubscribestyleSubscribestyle;
      'api::testimunial.testimunial': ApiTestimunialTestimunial;
      'api::ui-ux-banner.ui-ux-banner': ApiUiUxBannerUiUxBanner;
      'api::ui-ux-five-section.ui-ux-five-section': ApiUiUxFiveSectionUiUxFiveSection;
      'api::ui-ux-fourth-section.ui-ux-fourth-section': ApiUiUxFourthSectionUiUxFourthSection;
      'api::ui-ux-second-section.ui-ux-second-section': ApiUiUxSecondSectionUiUxSecondSection;
      'api::ui-ux-third-sectiob.ui-ux-third-sectiob': ApiUiUxThirdSectiobUiUxThirdSectiob;
      'api::we-section-one.we-section-one': ApiWeSectionOneWeSectionOne;
      'api::web-banner.web-banner': ApiWebBannerWebBanner;
      'api::web-section-fourth.web-section-fourth': ApiWebSectionFourthWebSectionFourth;
      'api::web-section-third.web-section-third': ApiWebSectionThirdWebSectionThird;
      'api::web-section-two.web-section-two': ApiWebSectionTwoWebSectionTwo;
    }
  }
}
