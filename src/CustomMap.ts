// Now that we have an interface we dont need to reference these two classes
// import { User } from './User';
// import { Company } from './Company';

// Instructions to every other class
// on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number,
    lng: number
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.querySelector(`#${divId}`), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  /* This is a better solution for the 2 methods below because we are just creating a function 1 function that will work for every marker we want to add but it still not perfect because it its not too scalable because we would still needed to add each import class and also we will need to add each type to the mappable argument with an OR
  */
  // addMarker(mappable: User | Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: mappable.location.lat,
  //       lng: mappable.location.lng
  //     }
  //   });
  // }

  /* The 2 methods below are a solution for adding a marker to a user and
     a company, but they are basically doing the same and wr will need to repeat
     the same code for each new classes we would wanted to add and also import each new classes (how abou new markers for other things in our applicatio like parking lots, parks etc.)
  */
  // addUserMarker(user: User): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: user.location.lat,
  //       lng: user.location.lng
  //     }
  //   });
  // }
  // addCompanyMarker(company: Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng
  //     }
  //   });
  // }
}