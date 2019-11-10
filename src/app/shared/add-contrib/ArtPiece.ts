export class ArtPiece {
    
    constructor(
      public pieceName: string,
      public artistFirst: string,
      public artistLast: string,
      public medium: string,
      public published: Date,
      public explicit: boolean,
      public sensitive: boolean,
      public description: string
    ) {  }

  }