import Foundation

@objc class CellContainer: UIView {
    var index: Int = -1
    var layoutType: String? = nil
    
    @objc func setIndex(_ index: Int) {
        self.index = index
    }
  
    @objc func setType(_ layoutType: String) {
        self.layoutType = layoutType
    }
}
