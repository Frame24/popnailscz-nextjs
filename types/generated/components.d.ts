import type { Struct, Schema } from '@strapi/strapi';

export interface StudioComponentsStudioComponents
  extends Struct.ComponentSchema {
  collectionName: 'components_studio_components_studio_components';
  info: {
    displayName: 'StudioComponents';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
  };
}

export interface ReviewReview extends Struct.ComponentSchema {
  collectionName: 'components_review_reviews';
  info: {
    displayName: 'Review';
  };
  attributes: {
    ReviewerName: Schema.Attribute.String;
    ReviewText: Schema.Attribute.Text;
  };
}

export interface QaQa extends Struct.ComponentSchema {
  collectionName: 'components_qa_qas';
  info: {
    displayName: 'QA';
  };
  attributes: {
    Question: Schema.Attribute.String;
    Answer: Schema.Attribute.Text;
  };
}

export interface PriceListPriceList extends Struct.ComponentSchema {
  collectionName: 'components_price_list_price_lists';
  info: {
    displayName: 'PriceList';
    description: '';
  };
  attributes: {
    name: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    price: Schema.Attribute.String;
  };
}

export interface GalleryGallery extends Struct.ComponentSchema {
  collectionName: 'components_gallery_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    altText: Schema.Attribute.String;
  };
}

export interface ContactContact extends Struct.ComponentSchema {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    ContactTitle: Schema.Attribute.String;
    ContactText: Schema.Attribute.Blocks;
  };
}

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: 'components_button_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonLink: Schema.Attribute.String;
  };
}

export interface BlogBlog extends Struct.ComponentSchema {
  collectionName: 'components_blog_blogs';
  info: {
    displayName: 'Blog';
  };
  attributes: {
    Title: Schema.Attribute.String;
    BlogText: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'studio-components.studio-components': StudioComponentsStudioComponents;
      'review.review': ReviewReview;
      'qa.qa': QaQa;
      'price-list.price-list': PriceListPriceList;
      'gallery.gallery': GalleryGallery;
      'contact.contact': ContactContact;
      'button.button': ButtonButton;
      'blog.blog': BlogBlog;
    }
  }
}
